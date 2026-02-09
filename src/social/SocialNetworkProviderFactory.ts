import { ISocialNetworkProvider } from './ISocialNetworkProvider';
import { FacebookProvider } from './FacebookProvider';
import { TwitterProvider } from './TwitterProvider';
import { MastodonProvider } from './MastodonProvider';
import { BlueskyProvider } from './BlueskyProvider';
import { ThreadsProvider } from './ThreadsProvider';

/**
 * Továrna pro vytváření poskytovatelů sociálních sítí
 * Implementuje factory pattern pro správu různých typů sociálních sítí
 * Automaticky registruje všechny dostupné providery při inicializaci
 */
export class SocialNetworkProviderFactory {
  private static providers: Map<string, ISocialNetworkProvider> = new Map();

  static {
    // Registruje všechny dostupné poskytovatele
    this.registerProvider(new FacebookProvider());
    this.registerProvider(new TwitterProvider());
    this.registerProvider(new MastodonProvider());
    this.registerProvider(new BlueskyProvider());
    this.registerProvider(new ThreadsProvider());
  }

  /**
   * Zaregistruje nového poskytovatele sociální sítě
   * @param provider - Poskytovatel k registraci
   * @returns void
   */
  static registerProvider(provider: ISocialNetworkProvider): void {
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
  static getProvider(networkType: string): ISocialNetworkProvider | null {
    if (!networkType) {
      return null;
    }
    return this.providers.get(networkType.toLowerCase()) || null;
  }

  /**
   * Získá všechny dostupné poskytovatele
   * @returns ISocialNetworkProvider[] - Pole všech zaregistrovaných poskytovatelů
   */
  static getAllProviders(): ISocialNetworkProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Získá seznam podporovaných typů sociálních sítí
   * @returns string[] - Pole názvů podporovaných sítí
   */
  static getSupportedNetworks(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Kontroluje, zda je typ sítě podporován
   * @param networkType - Typ sítě k ověření
   * @returns boolean - true pokud je síť podporována
   */
  static isSupported(networkType: string): boolean {
    if (!networkType) {
      return false;
    }
    return this.providers.has(networkType.toLowerCase());
  }
}
