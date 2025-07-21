
# Deployment Guide

This guide covers deployment options for the HVAC Chatbot Widget.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-username/hvac-chatbot-widget)

1. Click the deploy button above
2. Connect your GitHub account
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/hvac-chatbot-widget)

1. Click the deploy button above
2. Connect your GitHub account  
3. Set environment variables in Netlify dashboard
4. Deploy automatically

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+ installed
- Supabase project setup
- Resend API key configured

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the 'dist' directory
```

### Environment Variables
Set these in your hosting platform:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_COMPANY_NAME="Your Company Name"
VITE_COMPANY_PHONE="+1234567890"
VITE_COMPANY_EMAIL="info@yourcompany.com"
```

## 🗄️ Supabase Setup

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Save your project URL and anon key

### 2. Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-id

# Push database schema
supabase db push
```

### 3. Deploy Edge Functions
```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy send-quote-email
```

### 4. Set Secrets
```bash
# Set Resend API key
supabase secrets set RESEND_API_KEY=your-resend-key
```

## 📧 Email Configuration

### Resend Setup
1. Sign up at https://resend.com
2. Verify your domain at https://resend.com/domains
3. Create API key at https://resend.com/api-keys
4. Add API key to Supabase secrets

### Email Templates
Update the email templates in:
- `supabase/functions/send-quote-email/index.ts`

## 🌐 Domain Configuration

### Custom Domain
1. Configure your domain in your hosting platform
2. Update CORS settings in Supabase
3. Update embed script URLs

### HTTPS Setup
- Vercel and Netlify provide automatic HTTPS
- For custom deployments, configure SSL certificates

## 📱 Widget Embedding

### Basic Embed
```html
<!-- Add to any website -->
<script src="https://your-domain.com/embed.js"></script>
```

### Custom Configuration
```html
<script>
  window.BoltChatWidget = {
    config: {
      baseUrl: 'https://your-domain.com',
      theme: 'light',
      position: 'bottom-right'
    }
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

## 🔍 Monitoring

### Analytics Setup
Configure analytics in your hosting platform:
- Vercel Analytics
- Netlify Analytics  
- Google Analytics

### Error Tracking
Consider adding error tracking:
- Sentry
- Bugsnag
- LogRocket

## 🔒 Security

### Environment Variables
- Never commit secrets to git
- Use environment variables for all sensitive data
- Rotate API keys regularly

### CORS Configuration
Update CORS settings in:
- Supabase dashboard
- Edge function headers

### Content Security Policy
Add CSP headers for additional security:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 🚨 Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables
2. **API Errors**: Verify Supabase configuration  
3. **Email Not Sending**: Check Resend API key and domain verification
4. **CORS Errors**: Update allowed origins in Supabase

### Debug Mode
Enable debug logging in development:
```typescript
// Add to your component
console.log('Debug info:', { data, error, loading });
```

## 📈 Performance Optimization

### Bundle Size
- Use dynamic imports for large components
- Enable tree shaking in build process
- Optimize images and assets

### Caching
- Configure CDN caching headers
- Use service workers for offline functionality
- Implement proper cache invalidation

### Monitoring
- Set up performance monitoring
- Track Core Web Vitals
- Monitor error rates and response times
