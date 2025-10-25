# AI Chatbot

Modern, responsive AI chatbot uygulaması. OpenAI GPT-3.5-turbo modeli ile güçlendirilmiş, Next.js 16 ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

- 🤖 OpenAI GPT-3.5-turbo entegrasyonu
- 💬 Gerçek zamanlı chat interface
- 🌙 Dark/Light mode desteği
- 📱 Tam responsive tasarım
- ⚡ Hızlı ve modern UI/UX
- 🔒 Güvenli API endpoint'leri
- 🎨 Tailwind CSS ile modern tasarım

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

4. `.env.local` dosyasını düzenleyin ve OpenAI API key'inizi ekleyin:
```
OPENAI_API_KEY=your_openai_api_key_here
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

- `POST /api/chat` - Chat mesajları için API endpoint

## Teknolojiler

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenAI GPT-3.5-turbo
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