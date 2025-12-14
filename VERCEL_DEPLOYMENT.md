# Quick Start: Deploy Folivio to Vercel

## 🚀 Quick Deployment Steps

### 1. Environment Variables
Set these in Vercel Dashboard (Project Settings → Environment Variables):

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

**Important:** Replace `your-backend-api.com` with your actual backend URL.

### 2. Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable: `VITE_API_BASE_URL`
5. Click **Deploy**

### 3. Or Deploy via CLI

```bash
cd frontend
npm i -g vercel
vercel login
vercel --prod
```

## ✅ That's It!

After deployment, your users will get public portfolio URLs like:
```
https://your-project.vercel.app/portfolio/username
```

The app automatically detects your Vercel domain - no extra configuration needed!

## 📋 Files Created

- `frontend/vercel.json` - Vercel routing configuration
- `frontend/.vercelignore` - Files to exclude from deployment
- `frontend/DEPLOYMENT.md` - Detailed deployment guide

## 🔍 Verify It Works

1. Visit your deployed site
2. Create an account and portfolio
3. Copy your public URL (copy button in dashboard)
4. Open in incognito window - should work!

## 🔧 Backend CORS

Make sure your backend allows your Vercel domain:

```javascript
origin: ['https://your-project.vercel.app']
```

For detailed instructions, see `frontend/DEPLOYMENT.md`.

