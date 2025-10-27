# AI Chatbot with Web Browsing

Modern, responsive AI chatbot uygulaması. Google Gemini (Gemini 2.5 Flash) ile güçlendirilmiş, web browsing (web sörfü) özelliği ile web sitelerini okuyup içerikten cevap verebilen chatbot. Next.js 16 ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

- 🤖 Google Gemini (Gemini 2.5 Flash) entegrasyonu
- 🌐 Web Browsing (Web Sörfü): URL ekleyerek web sitesi içeriklerinden AI cevap üretme
- 💬 Gerçek zamanlı chat interface
- 🌙 Dark/Light mode desteği
- 📱 Tam responsive tasarım
- ⚡ Hızlı ve modern UI/UX
- 🔒 Güvenli API endpoint'leri
- 🎨 Tailwind CSS ile modern tasarım
- 🕷️ Otomatik web scraping (Cheerio)

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd chatbot
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ları ayarlayın:
```bash
cp env.example .env.local
```

4. `.env.local` dosyasını düzenleyin ve Google AI API key'inizi ekleyin:
```
GOOGLE_API_KEY=your_google_api_key_here
```

5. Development server'ı başlatın:
```bash
npm run dev
```

6. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Production Build

```bash
npm run build
npm start
```

## API Endpoints

- `POST /api/chat` - Chat mesajları için API endpoint (web browsing özellikli)
- `POST /api/web-content` - Web sitesi içeriği çekme endpoint (genel kullanım)

## Kullanım

### Web Browsing Özelliği

Chatbot'a bir URL ekleyerek o web sitesinin içeriğinden soru sorabilirsiniz:

```
Merhaba! https://example.com sayfasında ne yazıyor?
```

Chatbot otomatik olarak:
1. URL'yi algılar
2. Web sitesini okur
3. İçeriği analiz eder
4. Sorunuza göre cevap verir

## Teknolojiler

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini (Gemini 2.5 Flash)
- **Web Scraping**: Cheerio
- **Deployment**: Netlify ready

## Projeye Entegrasyon Rehberi

### 1. Site-Specific Chatbot Olarak Kullanım

Bu chatbot'u belirli bir web sitesine özel olarak kullanmak için:

#### Adım 1: Environment Variables Ayarlama
`.env.local` dosyasını oluşturun:
```bash
cp env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
# Google AI API Key (zorunlu)
GOOGLE_API_KEY=your_google_api_key_here

# Hedef site URL'i (zorunlu - site-specific için)
TARGET_SITE_URL=https://your-website.com
```

#### Adım 2: Site Yapılandırması
- `TARGET_SITE_URL` belirlediğiniz siteyi işaret eder
- Chatbot sadece bu site ile ilgili sorulara cevap verir
- Site dışı sorulara "Üzgünüm, ben sadece [site adı] hakkında soruları cevaplayabilirim." der

#### Adım 3: Test Etme
```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` açın ve test edin:
- Site ile ilgili sorular: ✅ Cevap verir
- Site dışı sorular: ❌ Kısıtlı cevap verir

### 2. Genel Chatbot Olarak Kullanım

Genel amaçlı chatbot olarak kullanmak için:

#### Adım 1: Environment Variables
```env
# Google AI API Key (zorunlu)
GOOGLE_API_KEY=your_google_api_key_here

# TARGET_SITE_URL'i boş bırakın veya yorum satırı yapın
# TARGET_SITE_URL=
```

#### Adım 2: Test Etme
- Tüm konularda sorulara cevap verir
- Site kısıtlaması yoktur

### 3. Önemli Notlar

#### Site Tarama Özellikleri:
- Maksimum 2 seviye derinlik
- Maksimum 20 sayfa
- Sadece aynı domain içindeki sayfalar
- İlk mesajda otomatik tarama başlar

#### Performans:
- İlk tarama 10-30 saniye sürebilir
- Sonraki mesajlar hızlıdır (cache'den)
- Server restart'ta tarama tekrarlanır

#### Güvenlik:
- Sadece public sayfalar taranır
- Login gerektiren sayfalar atlanır
- HTTPS zorunlu değil ama önerilir

### 4. Sorun Giderme

#### Site taranmıyor:
- `TARGET_SITE_URL` doğru mu?
- Site erişilebilir mi?
- Console'da hata var mı?

#### Yanlış cevaplar:
- Site içeriği güncel mi?
- Tarama tamamlandı mı?
- Cache'i temizlemek için server'ı yeniden başlatın

## Geliştirme

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Lisans

MIT License