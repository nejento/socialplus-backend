/**
 * Rozhraní pro poskytovatele sociálních sítí
 */
export interface ISocialNetworkProvider {
  /**
   * Typ sociální sítě (facebook, twitter, instagram, atd.)
   */
  readonly networkType: string;

  /**
   * Odešle příspěvek na sociální síť
   * @param content - Textový obsah příspěvku
   * @param attachments - Pole cest k přílohám
   * @param tokens - Autentifikační tokeny pro síť
   * @returns Promise<string | null> - ID příspěvku na síti nebo null při selhání
   */
  sendPost(
    content: string,
    attachments: string[],
    tokens: Record<string, string>
  ): Promise<string | null>;

  /**
   * Validuje, že jsou přítomny požadované tokeny
   * @param tokens - Autentifikační tokeny k validaci
   * @returns boolean - True pokud jsou tokeny platné
   */
  validateTokens(tokens: Record<string, string>): boolean;

  /**
   * Získá názvy požadovaných tokenů pro tohoto poskytovatele
   * @returns string[] - Pole názvů požadovaných tokenů
   */
  getRequiredTokens(): string[];

  /**
   * Získá metriky výkonu pro konkrétní příspěvek
   * @param postId - ID příspěvku specifické pro síť
   * @param tokens - Autentifikační tokeny pro síť
   * @returns Promise<PostPerformanceMetrics | null> - Metriky výkonu nebo null při selhání
   */
  getPostPerformance(
    postId: string,
    tokens: Record<string, string>
  ): Promise<PostPerformanceMetrics | null>;

  /**
   * Získá doporučený interval monitorování pro tuto síť (v hodinách)
   * @returns number - Počet hodin mezi kontrolami monitorování
   */
  getMonitoringInterval(): number;
}

/**
 * Výsledek operace odesílání příspěvku
 */
export interface PostResult {
  success: boolean;
  networkPostId?: string;
  error?: string;
}

/**
 * Metriky výkonu pro příspěvek na sociálních médiích
 */
export interface PostPerformanceMetrics {
  postId: string;
  networkType: string;
  timestamp: Date;
  views?: number;
  likes?: number;
  shares?: number;
  comments?: number;
  reposts?: number;
  reactions?: Record<string, number>; // Pro různé typy reakcí
  reach?: number;
  impressions?: number;
  engagement?: number;
  clickThroughRate?: number;
  customMetrics?: Record<string, any>;  // Metriky specifické pro síť
}

/**
 * Konfigurace pro připojení k InfluxDB
 */
export interface InfluxDBConfig {
  url: string;
  token: string;
  org: string;
  bucket: string;
}

/**
 * Informace o sledovaném příspěvku
 */
export interface TrackedPost {
  id: number;
  networkPostId: string;
  networkType: string;
  userId: number;
  createdAt: Date;
  content: string;
  isActive: boolean;
}
