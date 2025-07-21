
# HVAC Chatbot Widget

A modern, responsive chatbot widget for HVAC companies that provides FAQ assistance, quote generation, and customer support. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **FAQ Chatbot**: Intelligent responses to common questions
- **Quote Flow**: Multi-step quote generation for HVAC services
- **Photo Upload**: Image gallery support for service requests
- **Contact Methods**: WhatsApp, email, and phone integration
- **Responsive Design**: Works on desktop and mobile
- **Embeddable Widget**: Easy integration into any website

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Storage, Edge Functions)
- **Email**: Resend API
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Resend account for email functionality

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/hvac-chatbot-widget.git
cd hvac-chatbot-widget
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`

5. Set up Supabase:
```bash
npx supabase init
npx supabase start
npx supabase db reset
```

6. Start the development server:
```bash
npm run dev
```

## 🌐 Embedding the Widget

Add this script to any website to embed the chatbot:

```html
<script src="https://your-domain.com/embed.js"></script>
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── chatbot/         # Chatbot specific components
│   └── hvac/            # HVAC service components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── data/                # Static data and configurations
├── types/               # TypeScript type definitions
└── integrations/        # External service integrations

supabase/
├── functions/           # Edge functions
└── migrations/          # Database migrations
```

## 🔐 Environment Variables

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-api-key
```

## 📧 Email Configuration

1. Sign up for Resend at https://resend.com
2. Verify your domain at https://resend.com/domains
3. Create API key at https://resend.com/api-keys
4. Add the API key to your Supabase edge function secrets

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Connect your repository to Vercel or Netlify
2. Set environment variables
3. Deploy

### Supabase Functions
```bash
npx supabase functions deploy
```

## 📱 Usage

### Basic Integration
The widget automatically initializes when the embed script is loaded.

### Custom Configuration
```javascript
window.BoltChatWidget.config.baseUrl = 'https://your-domain.com';
```

## 🎨 Customization

### Branding
Edit the configuration in `src/utils/config/messageConfig.ts`:

```typescript
export const DEFAULT_COMPANY_CONFIG = {
  name: "Your Company",
  emoji: "🏠",
  whatsappNumber: "+1234567890",
  emailAddress: "info@yourcompany.com"
};
```

### Services
Configure available services in `src/data/hvacFlowConfigs.ts`.

### Styling
The widget uses Tailwind CSS. Customize colors in `src/index.css`.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@yourcompany.com or create an issue on GitHub.
