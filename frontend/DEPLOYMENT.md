# Deploying Folivio Frontend to Vercel

This guide will help you deploy the Folivio frontend to Vercel so users can access their public portfolio URLs.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your backend API deployed and accessible (can be on Vercel, Heroku, Railway, etc.)
3. Node.js installed locally (for testing)

## Step 1: Prepare Your Environment Variables

Before deploying, you need to set up environment variables. Create a `.env.production` file in the `frontend` directory with:

```env
# Your backend API URL (replace with your actual backend URL)
VITE_API_BASE_URL=https://your-backend-api.vercel.app/api

# Optional: Set this if you want to override the public URL (usually not needed)
# VITE_PUBLIC_URL=https://your-frontend.vercel.app
```

**Important Notes:**
- `VITE_API_BASE_URL` should point to your backend API
- The URL should include `/api` at the end, or it will be automatically added
- `VITE_PUBLIC_URL` is optional - if not set, it will automatically use your Vercel deployment URL

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - Project name? (Press enter for default or type a name)
   - Directory? (Press enter for `./`)
   - Override settings? **No**

6. For production deployment:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)

2. Import your Git repository:
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the repository containing this project

3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_BASE_URL` with your backend API URL
   - Optionally add `VITE_PUBLIC_URL` if needed

5. Click **Deploy**

## Step 3: Verify Deployment

After deployment:

1. Visit your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

2. Test the public portfolio route:
   - Create an account
   - Create a portfolio
   - Copy your public URL from the dashboard
   - Visit the URL in a new tab/incognito window

3. The public URL format will be:
   ```
   https://your-project.vercel.app/portfolio/username
   ```

## Step 4: Update Backend CORS Settings

Make sure your backend allows requests from your Vercel domain:

```javascript
// In your backend CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app',
    'https://*.vercel.app' // Allows all Vercel preview deployments
  ],
  credentials: true
};
```

## Step 5: Custom Domain (Optional)

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update `VITE_PUBLIC_URL` if you set it manually

## How Public URLs Work

- The app automatically detects the current domain when deployed
- Public portfolio URLs are generated as: `{current-domain}/portfolio/{username}`
- Users can copy these URLs directly from the dashboard
- URLs work immediately after deployment - no configuration needed!

## Troubleshooting

### Issue: API requests failing
- Check that `VITE_API_BASE_URL` is set correctly
- Verify your backend CORS settings allow your Vercel domain
- Check browser console for specific error messages

### Issue: Portfolio routes returning 404
- Ensure `vercel.json` is in the `frontend` directory
- The rewrite rules should redirect all routes to `index.html`
- Redeploy if you just added `vercel.json`

### Issue: Public URLs showing localhost
- Clear browser cache
- Check that the app is using the correct origin (should be your Vercel URL)
- If you set `VITE_PUBLIC_URL`, make sure it's correct

## Continuous Deployment

Once connected to a Git repository, Vercel will automatically deploy:
- **Production**: Every push to `main`/`master` branch
- **Preview**: Every push to other branches (creates unique preview URLs)

This means your portfolio URLs will always be up-to-date with your latest code!

