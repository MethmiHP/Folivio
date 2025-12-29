# Google OAuth Setup Guide for Folivio

This guide will help you set up Google OAuth (Gmail login) for your Folivio application.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. Access to your backend environment variables

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen:
     - Choose "External" (unless you have a Google Workspace)
     - Fill in the required fields (App name, User support email, Developer contact)
     - Add scopes: `email` and `profile`
     - Add test users if your app is in testing mode
   - Application type: **Web application**
   - Name: Folivio OAuth Client (or any name you prefer)

5. Configure Authorized redirect URIs:
   - Add your backend callback URL:
     - **Development**: `http://localhost:5000/api/auth/google/callback`
     - **Production**: `https://your-backend-domain.com/api/auth/google/callback`
   - Example: If your backend is at `https://api.folivio.com`, add:
     ```
     https://api.folivio.com/api/auth/google/callback
     ```

6. Save and copy your credentials:
   - **Client ID**: Copy this value
   - **Client Secret**: Copy this value (keep it secret!)

## Step 2: Configure Backend Environment Variables

Add these environment variables to your backend `.env` file:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here

# Frontend URL (for OAuth redirect after login)
FRONTEND_URL=http://localhost:5173
# For production:
# FRONTEND_URL=https://your-frontend-domain.com

# Backend URL (for OAuth callback - optional, will be auto-detected)
BACKEND_URL=http://localhost:5000
# For production:
# BACKEND_URL=https://your-backend-domain.com

# OR specify the full callback URL directly:
# GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback
```

### For Production Deployment:

If deploying to Railway, Heroku, Vercel, or similar:

1. **Railway/Heroku**: Add environment variables in the dashboard
2. **Vercel**: Add environment variables in Project Settings > Environment Variables
3. **Docker**: Add to your `docker-compose.yml` or `.env` file

## Step 3: Verify Backend Configuration

The backend is already configured to use Google OAuth. Verify:

1. **Passport.js** (`backend/src/config/passport.js`):
   - ✅ Google Strategy is configured
   - ✅ User creation/login logic is in place

2. **Auth Routes** (`backend/src/routes/authRoutes.js`):
   - ✅ `/api/auth/google` - Initiates OAuth flow
   - ✅ `/api/auth/google/callback` - Handles OAuth callback

3. **App Configuration** (`backend/src/app.js`):
   - ✅ Passport is initialized conditionally
   - ✅ Session middleware is configured

## Step 4: Test Google Login

1. **Start your backend server**:
   ```bash
   cd backend
   npm start
   ```

2. **Start your frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the flow**:
   - Go to `/login` or `/register`
   - Click "Continue with Google"
   - You should be redirected to Google's login page
   - After authentication, you'll be redirected back to your app
   - You should be logged in and redirected to `/dashboard`

## Troubleshooting

### Issue: "OAuth2Strategy requires a clientID option"
- **Solution**: Make sure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in your backend `.env` file

### Issue: "redirect_uri_mismatch"
- **Solution**: Ensure the redirect URI in Google Cloud Console exactly matches:
  - `http://localhost:5000/api/auth/google/callback` (development)
  - `https://your-backend-domain.com/api/auth/google/callback` (production)

### Issue: "Access blocked: This app's request is invalid"
- **Solution**: 
  - Check that your OAuth consent screen is properly configured
  - If in testing mode, add your email as a test user
  - Verify the scopes include `email` and `profile`

### Issue: User not created after Google login
- **Solution**: Check backend logs for errors. Verify MongoDB connection and User model schema

### Issue: Frontend redirect not working
- **Solution**: Ensure `FRONTEND_URL` environment variable is set correctly in backend

## Security Notes

1. **Never commit** `.env` files to version control
2. **Keep Client Secret secure** - never expose it in frontend code
3. **Use HTTPS** in production for secure OAuth flow
4. **Regularly rotate** OAuth credentials if compromised

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)

## Support

If you encounter issues, check:
1. Backend console logs for errors
2. Browser console for frontend errors
3. Network tab for failed requests
4. Google Cloud Console for OAuth errors

