/**
 * Get the public URL for portfolio sharing
 * Uses VITE_PUBLIC_URL if set, otherwise falls back to current origin
 * 
 * @param {string} path - Path to append (e.g., '/portfolio/username')
 * @returns {string} Full public URL
 */
export const getPublicUrl = (path = '') => {
  // Use environment variable if set (recommended for network/production access)
  const envUrl = import.meta.env.VITE_PUBLIC_URL || import.meta.env.VITE_FRONTEND_BASE_URL;
  
  if (envUrl) {
    return `${envUrl.replace(/\/+$/, '')}${path}`;
  }
  
  // Fallback to current origin
  const origin = window.location.origin;
  
  // Warn in console if using localhost (won't work on other devices)
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    console.warn(
      '⚠️ Public URL is using localhost. Portfolio links will not work on other devices.\n' +
      'To fix: Set VITE_PUBLIC_URL in your .env file to your network IP (e.g., http://192.168.1.100:5173)'
    );
  }
  
  return `${origin}${path}`;
};

/**
 * Check if the current URL is localhost
 * @returns {boolean}
 */
export const isLocalhost = () => {
  const origin = window.location.origin;
  return origin.includes('localhost') || origin.includes('127.0.0.1');
};

