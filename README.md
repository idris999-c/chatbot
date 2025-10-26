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
- **Deployment**: Vercel ready

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