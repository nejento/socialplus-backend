"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialNetworkProviderFactory = void 0;
const FacebookProvider_1 = require("./FacebookProvider");
const TwitterProvider_1 = require("./TwitterProvider");
const MastodonProvider_1 = require("./MastodonProvider");
const BlueskyProvider_1 = require("./BlueskyProvider");
const ThreadsProvider_1 = require("./ThreadsProvider");
/**
 * Továrna pro vytváření poskytovatelů sociálních sítí
 * Implementuje factory pattern pro správu různých typů sociálních sítí
 * Automaticky registruje všechny dostupné providery při inicializaci
 */
class SocialNetworkProviderFactory {
    static providers = new Map();
    static {
        // Registruje všechny dostupné poskytovatele
        this.registerProvider(new FacebookProvider_1.FacebookProvider());
        this.registerProvider(new TwitterProvider_1.TwitterProvider());
        this.registerProvider(new MastodonProvider_1.MastodonProvider());
        this.registerProvider(new BlueskyProvider_1.BlueskyProvider());
        this.registerProvider(new ThreadsProvider_1.ThreadsProvider());
    }
    /**
     * Zaregistruje nového poskytovatele sociální sítě
     * @param provider - Poskytovatel k registraci
     * @returns void
     */
    static registerProvider(provider) {
        if (!provider || typeof provider !== 'object' || !provider.networkType) {
            return; // Gracefully handle invalid input
        }
        this.providers.set(provider.networkType.toLowerCase(), provider);
    }
    /**
     * Získá poskytovatele podle typu sítě
     * @param networkType - Typ sociální sítě (case-insensitive)
     * @returns ISocialNetworkProvider | null - Poskytovatel nebo null pokud neexistuje
     */
    static getProvider(networkType) {
        if (!networkType) {
            return null;
        }
        return this.providers.get(networkType.toLowerCase()) || null;
    }
    /**
     * Získá všechny dostupné poskytovatele
     * @returns ISocialNetworkProvider[] - Pole všech zaregistrovaných poskytovatelů
     */
    static getAllProviders() {
        return Array.from(this.providers.values());
    }
    /**
     * Získá seznam podporovaných typů sociálních sítí
     * @returns string[] - Pole názvů podporovaných sítí
     */
    static getSupportedNetworks() {
        return Array.from(this.providers.keys());
    }
    /**
     * Kontroluje, zda je typ sítě podporován
     * @param networkType - Typ sítě k ověření
     * @returns boolean - true pokud je síť podporována
     */
    static isSupported(networkType) {
        if (!networkType) {
            return false;
        }
        return this.providers.has(networkType.toLowerCase());
    }
}
exports.SocialNetworkProviderFactory = SocialNetworkProviderFactory;
