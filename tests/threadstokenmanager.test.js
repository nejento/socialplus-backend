"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock axios first
globals_1.jest.mock('axios');
// Mock loggeru
globals_1.jest.mock('../src/utils/logger', () => ({
    logger: {
        info: globals_1.jest.fn(),
        error: globals_1.jest.fn(),
        warn: globals_1.jest.fn(),
        debug: globals_1.jest.fn(),
        trace: globals_1.jest.fn(),
        fatal: globals_1.jest.fn(),
    }
}));
// Vytvoří mock PrismaClient před importem čehokoliv s korektním typováním pro Jest
const mockPrismaClient = {
    network: {
        findMany: globals_1.jest.fn(),
    },
    networkToken: {
        findFirst: globals_1.jest.fn(),
        findMany: globals_1.jest.fn(),
        updateMany: globals_1.jest.fn(),
        upsert: globals_1.jest.fn(),
        create: globals_1.jest.fn(),
    },
    // PrismaClient methody kvůli TypeScriptu
    $connect: globals_1.jest.fn(),
    $disconnect: globals_1.jest.fn(),
    $use: globals_1.jest.fn(),
    $on: globals_1.jest.fn(),
    $transaction: globals_1.jest.fn(),
    $executeRaw: globals_1.jest.fn(),
    $executeRawUnsafe: globals_1.jest.fn(),
    $queryRaw: globals_1.jest.fn(),
    $queryRawUnsafe: globals_1.jest.fn(),
    $runCommandRaw: globals_1.jest.fn(),
    $extends: globals_1.jest.fn(),
};
// Mock celé generovaného klienta
globals_1.jest.mock('../src/generated/client', () => {
    return {
        PrismaClient: globals_1.jest.fn().mockImplementation(() => mockPrismaClient),
    };
});
// Import po mocku
const ThreadsTokenManager_1 = require("../src/social/ThreadsTokenManager");
const axios_1 = __importDefault(require("axios"));
const client_1 = require("../src/generated/client");
const logger_1 = require("../src/utils/logger");
const mockedAxios = axios_1.default;
const MockedPrismaClient = client_1.PrismaClient;
const mockedLogger = logger_1.logger;
describe('ThreadsTokenManager', () => {
    let tokenManager;
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        // Reset implementace mocku
        MockedPrismaClient.mockImplementation(() => mockPrismaClient);
        tokenManager = new ThreadsTokenManager_1.ThreadsTokenManager();
        // Mock console method k potlačení outputu během testů
        globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'warn').mockImplementation(() => { });
    });
    afterEach(() => {
        globals_1.jest.restoreAllMocks();
        tokenManager.stopPeriodicRefresh();
    });
    describe('Constructor and Initialization', () => {
        it('should create a new instance with mocked PrismaClient', () => {
            expect(tokenManager).toBeInstanceOf(ThreadsTokenManager_1.ThreadsTokenManager);
            expect(MockedPrismaClient).toHaveBeenCalled();
        });
        it('should export a singleton instance', () => {
            expect(ThreadsTokenManager_1.threadsTokenManager).toBeInstanceOf(ThreadsTokenManager_1.ThreadsTokenManager);
        });
    });
    describe('Timer Management', () => {
        it('should start periodic refresh scheduler', () => {
            const setIntervalSpy = globals_1.jest.spyOn(global, 'setInterval');
            tokenManager.startPeriodicRefresh();
            expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 12 * 60 * 60 * 1000 // 12 hodin
            );
        });
        it('should stop periodic refresh scheduler', () => {
            const clearIntervalSpy = globals_1.jest.spyOn(global, 'clearInterval');
            tokenManager.startPeriodicRefresh();
            tokenManager.stopPeriodicRefresh();
            expect(clearIntervalSpy).toHaveBeenCalled();
        });
        it('should handle stopping without starting', () => {
            expect(() => {
                tokenManager.stopPeriodicRefresh();
            }).not.toThrow();
        });
    });
    describe('Database Operations', () => {
        it('should handle database errors in checkAndRefreshExpiredTokens', async () => {
            mockPrismaClient.network.findMany.mockRejectedValue(new Error('Database error'));
            await expect(tokenManager['checkAndRefreshExpiredTokens']()).resolves.not.toThrow();
            expect(mockedLogger.error).toHaveBeenCalledWith('[ThreadsTokenManager] Error during periodic token refresh:', expect.any(Error));
        });
        it('should handle database errors during initialization', async () => {
            mockPrismaClient.network.findMany.mockRejectedValue(new Error('Database error'));
            await expect(tokenManager.initializeExistingTokenTimestamps()).resolves.not.toThrow();
            expect(mockedLogger.error).toHaveBeenCalledWith('[ThreadsTokenManager] Error initializing token timestamps:', expect.any(Error));
        });
        it('should handle database update errors', async () => {
            const networkId = 1;
            const newToken = 'new_access_token';
            mockPrismaClient.networkToken.updateMany.mockRejectedValue(new Error('Update failed'));
            await expect(tokenManager['updateTokenInDatabase'](networkId, newToken)).resolves.not.toThrow();
            expect(mockedLogger.error).toHaveBeenCalledWith(expect.stringContaining('Error updating token in database'), expect.any(Error));
        });
    });
    describe('API Operations', () => {
        it('should successfully refresh token via API', async () => {
            const networkId = 1;
            const currentToken = 'current_access_token';
            const userId = 'user123';
            mockedAxios.get.mockResolvedValue({
                data: {
                    access_token: 'new_access_token',
                    token_type: 'bearer',
                    expires_in: 5184000
                }
            });
            mockPrismaClient.networkToken.updateMany.mockResolvedValue({ count: 1 });
            mockPrismaClient.networkToken.upsert.mockResolvedValue({
                network_id: networkId,
                token_name: 'longLivedAccessTokenTimestamp',
                token: expect.any(String)
            });
            const result = await tokenManager.refreshTokenForNetwork(networkId, currentToken, userId);
            expect(result).toBe('new_access_token');
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${currentToken}`);
        });
        it('should handle API errors gracefully', async () => {
            const networkId = 1;
            const currentToken = 'current_access_token';
            const userId = 'user123';
            const error = new Error('API Error');
            error.name = 'AxiosError';
            error.response = {
                data: {
                    error: {
                        message: 'Invalid token',
                        type: 'OAuthException',
                        code: 190
                    }
                }
            };
            mockedAxios.get.mockRejectedValue(error);
            // Mock axios.isAxiosError aby vrátil return true pro tento error
            const isAxiosErrorSpy = globals_1.jest.spyOn(axios_1.default, 'isAxiosError').mockReturnValue(true);
            const result = await tokenManager.refreshTokenForNetwork(networkId, currentToken, userId);
            expect(result).toBeNull();
            expect(mockedLogger.error).toHaveBeenCalledWith('[ThreadsTokenManager] Threads API Error:', 'Invalid token');
            // Clean up the spy
            isAxiosErrorSpy.mockRestore();
        });
        it('should make correct API call and return new token', async () => {
            const currentToken = 'current_token';
            const newToken = 'new_token';
            mockedAxios.get.mockResolvedValue({
                data: {
                    access_token: newToken,
                    token_type: 'bearer',
                    expires_in: 5184000
                }
            });
            const result = await tokenManager['callThreadsRefreshAPI'](currentToken);
            expect(result).toBe(newToken);
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${currentToken}`);
        });
        it('should handle API errors and return null', async () => {
            const currentToken = 'current_token';
            mockedAxios.get.mockRejectedValue(new Error('Network error'));
            const result = await tokenManager['callThreadsRefreshAPI'](currentToken);
            expect(result).toBeNull();
            expect(mockedLogger.error).toHaveBeenCalledWith('[ThreadsTokenManager] Error calling Threads refresh API:', expect.any(Error));
        });
    });
    describe('Token Management', () => {
        it('should handle token map without threadsUserId', async () => {
            const tokenMap = {
                longLivedAccessToken: 'current_token',
                threadsAppSecret: 'app_secret'
                // Chybějící threadsUserId
            };
            const result = await tokenManager.getRefreshedTokens(tokenMap);
            expect(result).toBeNull();
            expect(mockedLogger.error).toHaveBeenCalledWith('[ThreadsTokenManager] No threadsUserId provided in tokens');
        });
    });
    describe('Integration Tests - Simplified', () => {
        it('should demonstrate the token manager can be instantiated and basic methods called', async () => {
            expect(tokenManager).toBeDefined();
            expect(typeof tokenManager.refreshTokenForNetwork).toBe('function');
            expect(typeof tokenManager.getRefreshedTokens).toBe('function');
            expect(typeof tokenManager.initializeExistingTokenTimestamps).toBe('function');
        });
        it('should handle missing parameters gracefully', async () => {
            const result = await tokenManager.getRefreshedTokens({});
            expect(result).toBeNull();
        });
    });
});
