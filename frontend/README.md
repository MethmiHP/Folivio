# Folivio Frontend

## Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
# Backend API base URL (without /api suffix)
VITE_API_BASE_URL=http://localhost:5000

# Public Frontend URL (REQUIRED for portfolio links to work on other devices)
# For local network access: Use your machine's IP address
#   Example: http://192.168.1.100:5173
# For production: Use your domain
#   Example: https://yourdomain.com
# If not set, will use localhost (won't work on other devices)
VITE_PUBLIC_URL=
```

## Setting up Public URL for Network Access

To make portfolio links work on other computers/devices on your network:

1. **Find your machine's IP address:**
   - Windows: Run `ipconfig` in Command Prompt, look for "IPv4 Address"
   - Mac/Linux: Run `ifconfig` or `ip addr`, look for your network interface IP

2. **Set VITE_PUBLIC_URL in `.env`:**
   ```env
   VITE_PUBLIC_URL=http://YOUR_IP:5173
   ```
   Example: `VITE_PUBLIC_URL=http://192.168.1.100:5173`

3. **Restart the dev server** after changing `.env` file

4. **Make sure your firewall allows connections** on port 5173 (or your Vite port)

Now portfolio links will work on other devices on your network!
