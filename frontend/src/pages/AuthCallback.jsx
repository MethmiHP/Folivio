import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    const handleCallback = async () => {
      if (error) {
        console.error('OAuth error:', error);
        const errorMessage = searchParams.get('message') || 'Authentication failed';
        navigate(`/login?error=oauth_failed&message=${encodeURIComponent(errorMessage)}`);
        return;
      }

      if (token) {
        try {
          // Store token and fetch user data
          localStorage.setItem('token', token);
            // Store token and fetch user data
          // Fetch user data with the token
          const response = await api.get('/auth/me');
          
          if (response.data) {
            login({
              ...response.data,
              token: token
            });
            
            // Redirect to dashboard
            navigate('/dashboard', { replace: true });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (err) {
          console.error('Failed to authenticate:', err);
          localStorage.removeItem('token');
          const errorMessage = err.response?.data?.message || err.message || 'Failed to authenticate';
          navigate(`/login?error=auth_failed&message=${encodeURIComponent(errorMessage)}`);
        }
      } else {
        navigate('/login?error=no_token&message=' + encodeURIComponent('No authentication token received'));
      }
    };

    handleCallback();
  }, [token, error, navigate, login, searchParams]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-slate-300">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

