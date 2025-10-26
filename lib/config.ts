/**
 * Web Browsing Chatbot Konfigürasyonu
 * İleride e-academy veya diğer özel siteler için bu dosya güncellenecek
 */

export interface WebBrowsingConfig {
  // İzin verilen domain'ler (whitelist)
  allowedDomains: string[];
  
  // Yasaklı domain'ler (blacklist)
  blockedDomains: string[];
  
  // Maksimum scraping derinliği
  maxDepth: number;
  
  // Maksimum sayfa sayısı
  maxPages: number;
  
  // User agent string
  userAgent: string;
  
  // Timeout (milisaniye)
  timeout: number;
}

// Varsayılan genel yapılandırma
export const defaultConfig: WebBrowsingConfig = {
  allowedDomains: [], // Boş = tüm domainlere izin ver
  blockedDomains: [],
  maxDepth: 1, // Sadece verilen URL'i tarar, daha derine inmez
  maxPages: 1, // Tek sayfa
  userAgent: 'Mozilla/5.0 (compatible; WebCrawler/1.0)',
  timeout: 10000, // 10 saniye
};

// İleride e-academy için özel yapılandırma eklenirse:
// export const eAcademyConfig: WebBrowsingConfig = {
//   allowedDomains: ['eacademy.com', 'www.eacademy.com'],
//   blockedDomains: ['admin.eacademy.com'],
//   maxDepth: 3,
//   maxPages: 20,
//   userAgent: 'Mozilla/5.0 (compatible; WebCrawler/1.0)',
//   timeout: 15000,
// };

// Aktif konfigürasyonu döndür
export function getActiveConfig(): WebBrowsingConfig {
  // Şimdilik default config
  // İleride environment variable'a göre değişebilir
  // const env = process.env.CHATBOT_MODE;
  // if (env === 'eacademy') return eAcademyConfig;
  
  return defaultConfig;
}

