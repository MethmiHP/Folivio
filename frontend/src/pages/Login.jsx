// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock } from "lucide-react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import logoFinal from "../assets/logo-final.png";

// const Login = () => {
//   useEffect(() => {
//     // Remove default body styles
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//       console.log('Login successful:', res.data);
      
//       login(res.data);
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.error('Login error:', {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//         config: {
//           url: err.config?.url,
//           method: err.config?.method,
//           headers: err.config?.headers
//         }
//       });
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-auto">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
//       </div>

//       {/* Login card */}
//       <div className="relative w-full max-w-md">
//         {/* Glow effect */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-20 transition duration-1000"></div>
        
//         {/* Main card */}
//         <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-teal-500/50 overflow-hidden">
//               <img 
//                 src={logoFinal} 
//                 alt="Folivio Logo" 
//                 className="w-full h-full object-contain p-3"
//               />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-slate-400 text-sm">
//               Sign in to create your stunning portfolio
//             </p>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-2">
//               <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email/Username field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Email or Username
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   value={emailOrUsername}
//                   onChange={(e) => setEmailOrUsername(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
//                   placeholder="Enter your email or username"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Password
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot password link */}
//             <div className="flex items-center justify-end">
//               <a
//                 href="#"
//                 className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-800"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-slate-900 text-slate-500">
//                 New to our platform?
//               </span>
//             </div>
//           </div>

//           {/* Sign up link */}
//           <div className="text-center">
//             <p className="text-slate-400 text-sm">
//               Create your portfolio in minutes.{" "}
//               <Link
//                 to="/register"
//                 className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
//               >
//                 Sign up for free
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import logoFinal from "../assets/logo_2.png";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = () => {
  useEffect(() => {
    // Remove default body styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    emailOrUsername: false,
    password: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Check for OAuth errors in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthError = params.get('error');
    const oauthMessage = params.get('message');
    
    if (oauthError === 'oauth_failed') {
      setError(oauthMessage || 'Google login failed. Please try again.');
    }
  }, [location.search]);

  const validateEmailOrUsername = (value) => {
    if (!value || value.trim() === "") {
      return "Email or username is required";
    }
    
    // Check if it's trying to be an email but missing @
    const hasMultipleDots = (value.match(/\./g) || []).length >= 2;
    const hasDotAfterAt = value.includes('@.') || value.includes('.@');
    const endsWithDot = value.endsWith('.');
    
    if (!value.includes('@') && (hasMultipleDots || hasDotAfterAt || endsWithDot)) {
      return "Please include an '@' in the email address";
    }
    
    // If it contains @, validate as email
    if (value.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        if (!value.includes('@')) {
          return "Please include an '@' in the email address";
        }
        if (value.indexOf('@') === 0) {
          return "Please enter a part before @";
        }
        if (value.indexOf('@') === value.length - 1) {
          return "Please enter a part after @";
        }
        if (!value.includes('.')) {
          return "Please include a '.' in the email address";
        }
        if (value.endsWith('.')) {
          return "'.' is used at a wrong position";
        }
        return "Please enter a valid email address";
      }
    } else {
      // Validate username (no @)
      if (value.trim().length < 3) {
        return "Username must be at least 3 characters";
      }
    }
    
    return "";
  };

  const validatePassword = (value) => {
    if (!value || value.trim() === "") {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleEmailOrUsernameChange = (e) => {
    const value = e.target.value;
    setEmailOrUsername(value);

    // Real-time validation if field has been touched
    if (touched.emailOrUsername) {
      const errorMsg = validateEmailOrUsername(value);
      setErrors((prev) => ({ ...prev, emailOrUsername: errorMsg }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Real-time validation if field has been touched
    if (touched.password) {
      const errorMsg = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: errorMsg }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    // Validate on blur
    if (fieldName === "emailOrUsername") {
      const errorMsg = validateEmailOrUsername(emailOrUsername);
      setErrors((prev) => ({ ...prev, emailOrUsername: errorMsg }));
    } else if (fieldName === "password") {
      const errorMsg = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: errorMsg }));
    }
  };

  const validateForm = () => {
    const emailOrUsernameError = validateEmailOrUsername(emailOrUsername);
    const passwordError = validatePassword(password);

    setErrors({
      emailOrUsername: emailOrUsernameError,
      password: passwordError,
    });

    setTouched({
      emailOrUsername: true,
      password: true,
    });

    return !emailOrUsernameError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // First, validate the form and get validation state
    const isFormValid = validateForm();
    
    // If there are validation errors, don't proceed with login
    if (!isFormValid) {
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { emailOrUsername, password });
      login(res.data);
      navigate(from, { replace: true });
    } catch (err) {
      // Only show login error if there are no field validation errors
      if (!errors.emailOrUsername && !errors.password) {
        setError(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputBorderClass = (fieldName) => {
    if (!touched[fieldName]) {
      return "border-slate-700/50 focus:border-teal-500";
    }
    return errors[fieldName]
      ? "border-red-500/50 focus:border-red-500"
      : "border-green-500/50 focus:border-green-500";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-y-auto overflow-x-hidden scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-20 transition duration-1000"></div>

        {/* Main card */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-teal-500/50 overflow-hidden">
              <img 
                src={logoFinal} 
                alt="Folivio Logo" 
                className="w-full h-full object-contain p-3.5"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to create your stunning portfolio
            </p>
          </div>

          {/* Error message - Only show login error if there are no field validation errors */}
          {error && !errors.emailOrUsername && !errors.password && (
            <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-2 animate-in slide-in-from-top-2">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Username field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Email or Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors ${
                      touched.emailOrUsername && !errors.emailOrUsername
                        ? "text-green-400"
                        : touched.emailOrUsername && errors.emailOrUsername
                        ? "text-red-400"
                        : "text-slate-500 group-focus-within:text-teal-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={handleEmailOrUsernameChange}
                  onBlur={() => handleBlur("emailOrUsername")}
                  className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "emailOrUsername"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder={emailOrUsername.includes('@') || (emailOrUsername.includes('.') && !emailOrUsername.includes('@')) ? "Enter your email" : "Enter your username or email"}
                  required
                  inputMode={emailOrUsername.includes('@') || (emailOrUsername.includes('.') && !emailOrUsername.includes('@')) ? 'email' : 'text'}
                />
                {touched.emailOrUsername && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {errors.emailOrUsername ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                )}
              </div>
              {touched.emailOrUsername && errors.emailOrUsername && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors.emailOrUsername}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 transition-colors ${
                      touched.password && !errors.password
                        ? "text-green-400"
                        : touched.password && errors.password
                        ? "text-red-400"
                        : "text-slate-500 group-focus-within:text-teal-400"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "password"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex items-center justify-end">
              <a
                href="forgot-password"
                className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-slate-500">
                Or
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <GoogleLoginButton />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900 text-slate-500">
                New to our platform?
              </span>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Create your portfolio in minutes.{" "}
              <Link
                to="/register"
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;