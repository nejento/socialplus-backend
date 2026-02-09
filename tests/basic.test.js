"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
describe('Basic Test Setup', () => {
    it('should run basic test successfully', () => {
        expect(1 + 1).toBe(2);
    });
    it('should work with mocks', () => {
        const mockFn = globals_1.jest.fn();
        mockFn.mockReturnValue('test');
        expect(mockFn()).toBe('test');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
