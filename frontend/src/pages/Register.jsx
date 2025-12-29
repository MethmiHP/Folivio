// // import { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Eye, EyeOff, Mail, Lock, User, UserCircle } from "lucide-react";
// // import api from "../api/axios";
// // import { useAuth } from "../context/AuthContext";
// // import logoFinal from "../assets/logo-final.png";

// // const Register = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     username: "",
// //     password: "",
// //   });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Remove default body styles
// //     document.body.style.margin = '0';
// //     document.body.style.padding = '0';
// //     document.body.style.overflow = 'hidden';
    
// //     return () => {
// //       document.body.style.overflow = 'auto';
// //     };
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await api.post("/auth/register", form);
// //       login(res.data);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Registration failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-auto">
// //       {/* Animated background elements */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
// //       </div>

// //       {/* Register card */}
// //       <div className="relative w-full max-w-md my-8">
// //         {/* Glow effect */}
// //         <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-20 transition duration-1000"></div>
        
// //         {/* Main card */}
// //         <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
// //           {/* Header */}
// //           <div className="text-center mb-8">
// //             <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-teal-500/50 overflow-hidden">
// //               <img 
// //                 src={logoFinal} 
// //                 alt="Folivio Logo" 
// //                 className="w-full h-full object-contain p-3"
// //               />
// //             </div>
// //             <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
// //               Create Account
// //             </h1>
// //             <p className="text-slate-400 text-sm">
// //               Start building your stunning portfolio today
// //             </p>
// //           </div>

// //           {/* Error message */}
// //           {error && (
// //             <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-2">
// //               <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //               </svg>
// //               <span>{error}</span>
// //             </div>
// //           )}

// //           {/* Form */}
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             {/* Full Name field */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-slate-300">
// //                 Full Name
// //               </label>
// //               <div className="relative group">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                   <User className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
// //                 </div>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={form.name}
// //                   onChange={handleChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
// //                   placeholder="Enter your full name"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Email field */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-slate-300">
// //                 Email
// //               </label>
// //               <div className="relative group">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                   <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
// //                 </div>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={form.email}
// //                   onChange={handleChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
// //                   placeholder="Enter your email"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Username field */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-slate-300">
// //                 Username
// //               </label>
// //               <div className="relative group">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                   <UserCircle className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
// //                 </div>
// //                 <input
// //                   type="text"
// //                   name="username"
// //                   value={form.username}
// //                   onChange={handleChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
// //                   placeholder="Choose a username"
// //                   required
// //                 />
// //               </div>
// //               <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-2">
// //                 <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
// //                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// //                 </svg>
// //                 <span>
// //                   Your portfolio will be available at: <span className="text-teal-400 font-medium">yoursite.com/{form.username || "username"}</span>
// //                 </span>
// //               </p>
// //             </div>

// //             {/* Password field */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-slate-300">
// //                 Password
// //               </label>
// //               <div className="relative group">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                   <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
// //                 </div>
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   name="password"
// //                   value={form.password}
// //                   onChange={handleChange}
// //                   className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
// //                   placeholder="Create a strong password"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Submit button */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
// //             >
// //               {loading ? (
// //                 <span className="flex items-center justify-center gap-2">
// //                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// //                   </svg>
// //                   Creating account...
// //                 </span>
// //               ) : (
// //                 "Create Account"
// //               )}
// //             </button>
// //           </form>

// //           {/* Divider */}
// //           <div className="relative my-8">
// //             <div className="absolute inset-0 flex items-center">
// //               <div className="w-full border-t border-slate-800"></div>
// //             </div>
// //             <div className="relative flex justify-center text-sm">
// //               <span className="px-4 bg-slate-900 text-slate-500">
// //                 Already have an account?
// //               </span>
// //             </div>
// //           </div>

// //           {/* Login link */}
// //           <div className="text-center">
// //             <p className="text-slate-400 text-sm">
// //               Sign in to your existing account.{" "}
// //               <Link
// //                 to="/login"
// //                 className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
// //               >
// //                 Login here
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;


// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, UserCircle, CheckCircle, XCircle } from "lucide-react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import logoFinal from "../assets/logo-final.png";
// import {
//   validateEmail,
//   validatePassword,
//   validateUsername,
//   validateName,
//   getPasswordStrengthColor,
//   getPasswordStrengthBarColor,
// } from "../utils/validationUtils";

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//     username: false,
//     password: false,
//   });
//   const [passwordStrength, setPasswordStrength] = useState({
//     strength: "",
//     checks: {
//       minLength: false,
//       hasUpperCase: false,
//       hasLowerCase: false,
//       hasNumber: false,
//       hasSpecialChar: false,
//     },
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Remove default body styles
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));

//     // Real-time validation for the field being changed
//     if (touched[name]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((t) => ({ ...t, [name]: true }));
//     validateField(name, value);
//   };

//   const validateField = (fieldName, value) => {
//     let validation;

//     switch (fieldName) {
//       case "name":
//         validation = validateName(value);
//         setErrors((e) => ({ ...e, name: validation.message }));
//         break;
//       case "email":
//         validation = validateEmail(value);
//         setErrors((e) => ({ ...e, email: validation.message }));
//         break;
//       case "username":
//         validation = validateUsername(value);
//         setErrors((e) => ({ ...e, username: validation.message }));
//         break;
//       case "password":
//         validation = validatePassword(value);
//         setErrors((e) => ({ ...e, password: validation.message }));
//         setPasswordStrength({
//           strength: validation.strength,
//           checks: validation.checks,
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   const validateForm = () => {
//     const nameValidation = validateName(form.name);
//     const emailValidation = validateEmail(form.email);
//     const usernameValidation = validateUsername(form.username);
//     const passwordValidation = validatePassword(form.password);

//     setErrors({
//       name: nameValidation.message,
//       email: emailValidation.message,
//       username: usernameValidation.message,
//       password: passwordValidation.message,
//     });

//     setTouched({
//       name: true,
//       email: true,
//       username: true,
//       password: true,
//     });

//     return (
//       nameValidation.isValid &&
//       emailValidation.isValid &&
//       usernameValidation.isValid &&
//       passwordValidation.isValid
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validate all fields before submitting
//     if (!validateForm()) {
//       setError("Please fix all validation errors before submitting");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/auth/register", form);
//       login(res.data);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInputBorderClass = (fieldName) => {
//     if (!touched[fieldName]) {
//       return "border-slate-700/50 focus:border-teal-500";
//     }
//     return errors[fieldName]
//       ? "border-red-500/50 focus:border-red-500"
//       : "border-green-500/50 focus:border-green-500";
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-auto">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "700ms" }}
//         ></div>
//       </div>

//       {/* Register card */}
//       <div className="relative w-full max-w-md my-8">
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
//               Create Account
//             </h1>
//             <p className="text-slate-400 text-sm">
//               Start building your stunning portfolio today
//             </p>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-2">
//               <svg
//                 className="w-5 h-5 mt-0.5 flex-shrink-0"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full Name field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Full Name
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <User
//                     className={`w-5 h-5 transition-colors ${
//                       touched.name && !errors.name
//                         ? "text-green-400"
//                         : touched.name && errors.name
//                         ? "text-red-400"
//                         : "text-slate-500 group-focus-within:text-teal-400"
//                     }`}
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
//                     "name"
//                   )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
//                   placeholder="Enter your full name"
//                   required
//                 />
//                 {touched.name && (
//                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                     {errors.name ? (
//                       <XCircle className="w-5 h-5 text-red-400" />
//                     ) : (
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                     )}
//                   </div>
//                 )}
//               </div>
//               {touched.name && errors.name && (
//                 <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//                   <XCircle className="w-3 h-3" />
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Email field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Email
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Mail
//                     className={`w-5 h-5 transition-colors ${
//                       touched.email && !errors.email
//                         ? "text-green-400"
//                         : touched.email && errors.email
//                         ? "text-red-400"
//                         : "text-slate-500 group-focus-within:text-teal-400"
//                     }`}
//                   />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
//                     "email"
//                   )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
//                   placeholder="Enter your email"
//                   required
//                 />
//                 {touched.email && (
//                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                     {errors.email ? (
//                       <XCircle className="w-5 h-5 text-red-400" />
//                     ) : (
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                     )}
//                   </div>
//                 )}
//               </div>
//               {touched.email && errors.email && (
//                 <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//                   <XCircle className="w-3 h-3" />
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Username field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Username
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <UserCircle
//                     className={`w-5 h-5 transition-colors ${
//                       touched.username && !errors.username
//                         ? "text-green-400"
//                         : touched.username && errors.username
//                         ? "text-red-400"
//                         : "text-slate-500 group-focus-within:text-teal-400"
//                     }`}
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="username"
//                   value={form.username}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
//                     "username"
//                   )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
//                   placeholder="Choose a username"
//                   required
//                 />
//                 {touched.username && (
//                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                     {errors.username ? (
//                       <XCircle className="w-5 h-5 text-red-400" />
//                     ) : (
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                     )}
//                   </div>
//                 )}
//               </div>
//               {touched.username && errors.username ? (
//                 <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//                   <XCircle className="w-3 h-3" />
//                   {errors.username}
//                 </p>
//               ) : (
//                 <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-2">
//                   <svg
//                     className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span>
//                     Your portfolio will be available at:{" "}
//                     <span className="text-teal-400 font-medium">
//                       yoursite.com/{form.username || "username"}
//                     </span>
//                   </span>
//                 </p>
//               )}
//             </div>

//             {/* Password field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-slate-300">
//                 Password
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Lock
//                     className={`w-5 h-5 transition-colors ${
//                       touched.password && !errors.password
//                         ? "text-green-400"
//                         : touched.password && errors.password
//                         ? "text-red-400"
//                         : "text-slate-500 group-focus-within:text-teal-400"
//                     }`}
//                   />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border ${getInputBorderClass(
//                     "password"
//                   )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
//                   placeholder="Create a strong password"
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

//               {/* Password strength indicator */}
//               {form.password && (
//                 <div className="space-y-2 mt-2">
//                   <div className="flex items-center gap-2">
//                     <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full transition-all duration-300 ${getPasswordStrengthBarColor(
//                           passwordStrength.strength
//                         )}`}
//                         style={{
//                           width:
//                             passwordStrength.strength === "strong"
//                               ? "100%"
//                               : passwordStrength.strength === "medium"
//                               ? "66%"
//                               : "33%",
//                         }}
//                       ></div>
//                     </div>
//                     <span
//                       className={`text-xs font-medium ${getPasswordStrengthColor(
//                         passwordStrength.strength
//                       )}`}
//                     >
//                       {passwordStrength.strength === "strong"
//                         ? "Strong"
//                         : passwordStrength.strength === "medium"
//                         ? "Medium"
//                         : "Weak"}
//                     </span>
//                   </div>

//                   {/* Password requirements checklist */}
//                   <div className="space-y-1 text-xs">
//                     <div
//                       className={`flex items-center gap-2 ${
//                         passwordStrength.checks.minLength
//                           ? "text-green-400"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {passwordStrength.checks.minLength ? (
//                         <CheckCircle className="w-3 h-3" />
//                       ) : (
//                         <XCircle className="w-3 h-3" />
//                       )}
//                       <span>At least 8 characters</span>
//                     </div>
//                     <div
//                       className={`flex items-center gap-2 ${
//                         passwordStrength.checks.hasUpperCase
//                           ? "text-green-400"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {passwordStrength.checks.hasUpperCase ? (
//                         <CheckCircle className="w-3 h-3" />
//                       ) : (
//                         <XCircle className="w-3 h-3" />
//                       )}
//                       <span>One uppercase letter</span>
//                     </div>
//                     <div
//                       className={`flex items-center gap-2 ${
//                         passwordStrength.checks.hasLowerCase
//                           ? "text-green-400"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {passwordStrength.checks.hasLowerCase ? (
//                         <CheckCircle className="w-3 h-3" />
//                       ) : (
//                         <XCircle className="w-3 h-3" />
//                       )}
//                       <span>One lowercase letter</span>
//                     </div>
//                     <div
//                       className={`flex items-center gap-2 ${
//                         passwordStrength.checks.hasNumber
//                           ? "text-green-400"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {passwordStrength.checks.hasNumber ? (
//                         <CheckCircle className="w-3 h-3" />
//                       ) : (
//                         <XCircle className="w-3 h-3" />
//                       )}
//                       <span>One number</span>
//                     </div>
//                     <div
//                       className={`flex items-center gap-2 ${
//                         passwordStrength.checks.hasSpecialChar
//                           ? "text-green-400"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {passwordStrength.checks.hasSpecialChar ? (
//                         <CheckCircle className="w-3 h-3" />
//                       ) : (
//                         <XCircle className="w-3 h-3" />
//                       )}
//                       <span>One special character (!@#$%^&*)</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {touched.password && errors.password && (
//                 <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//                   <XCircle className="w-3 h-3" />
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                       fill="none"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Creating account...
//                 </span>
//               ) : (
//                 "Create Account"
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
//                 Already have an account?
//               </span>
//             </div>
//           </div>

//           {/* Login link */}
//           <div className="text-center">
//             <p className="text-slate-400 text-sm">
//               Sign in to your existing account.{" "}
//               <Link
//                 to="/login"
//                 className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
//               >
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserCircle, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import logoFinal from "../assets/logo_2.png";
import GoogleLoginButton from "../components/GoogleLoginButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  getPasswordStrengthColor,
  getPasswordStrengthBarColor,
} from "../utils/validationUtils";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    checks: {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove default body styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Real-time validation for the field being changed
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let validation;

    switch (fieldName) {
      case "name":
        validation = validateName(value);
        setErrors((e) => ({ ...e, name: validation.message }));
        break;
      case "email":
        validation = validateEmail(value);
        setErrors((e) => ({ ...e, email: validation.message }));
        break;
      case "username":
        validation = validateUsername(value);
        setErrors((e) => ({ ...e, username: validation.message }));
        break;
      case "password":
        validation = validatePassword(value);
        setErrors((e) => ({ ...e, password: validation.message }));
        setPasswordStrength({
          strength: validation.strength,
          checks: validation.checks,
        });
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const nameValidation = validateName(form.name);
    const emailValidation = validateEmail(form.email);
    const usernameValidation = validateUsername(form.username);
    const passwordValidation = validatePassword(form.password);

    setErrors({
      name: nameValidation.message,
      email: emailValidation.message,
      username: usernameValidation.message,
      password: passwordValidation.message,
    });

    setTouched({
      name: true,
      email: true,
      username: true,
      password: true,
    });

    return (
      nameValidation.isValid &&
      emailValidation.isValid &&
      usernameValidation.isValid &&
      passwordValidation.isValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields before submitting
    if (!validateForm()) {
      setError("Please fix all validation errors before submitting");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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

      {/* Register card */}
      <div className="relative w-full max-w-md my-auto py-8">
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
              Create Account
            </h1>
            <p className="text-slate-400 text-sm">
              Start building your stunning portfolio today
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-2">
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
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    className={`w-5 h-5 transition-colors ${
                      touched.name && !errors.name
                        ? "text-green-400"
                        : touched.name && errors.name
                        ? "text-red-400"
                        : "text-slate-500 group-focus-within:text-teal-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "name"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder="Enter your full name"
                  required
                />
                {touched.name && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {errors.name ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors ${
                      touched.email && !errors.email
                        ? "text-green-400"
                        : touched.email && errors.email
                        ? "text-red-400"
                        : "text-slate-500 group-focus-within:text-teal-400"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "email"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder="Enter your email"
                  required
                />
                {touched.email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {errors.email ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Username field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircle
                    className={`w-5 h-5 transition-colors ${
                      touched.username && !errors.username
                        ? "text-green-400"
                        : touched.username && errors.username
                        ? "text-red-400"
                        : "text-slate-500 group-focus-within:text-teal-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-10 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "username"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder="Choose a username"
                  required
                />
                {touched.username && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    {errors.username ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                )}
              </div>
              {touched.username && errors.username ? (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              ) : (
                <p className="text-xs text-slate-500 flex items-start gap-1.5 mt-2">
                  <svg
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Your portfolio will be available at:{" "}
                    <span className="text-teal-400 font-medium">
                      yoursite.com/{form.username || "username"}
                    </span>
                  </span>
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
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border ${getInputBorderClass(
                    "password"
                  )} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200`}
                  placeholder="Create a strong password"
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

              {/* Password strength indicator */}
              {form.password && (
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthBarColor(
                          passwordStrength.strength
                        )}`}
                        style={{
                          width:
                            passwordStrength.strength === "strong"
                              ? "100%"
                              : passwordStrength.strength === "medium"
                              ? "66%"
                              : "33%",
                        }}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-medium ${getPasswordStrengthColor(
                        passwordStrength.strength
                      )}`}
                    >
                      {passwordStrength.strength === "strong"
                        ? "Strong"
                        : passwordStrength.strength === "medium"
                        ? "Medium"
                        : "Weak"}
                    </span>
                  </div>

                  {/* Password requirements checklist */}
                  <div className="space-y-1 text-xs">
                    <div
                      className={`flex items-center gap-2 ${
                        passwordStrength.checks.minLength
                          ? "text-green-400"
                          : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.checks.minLength ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordStrength.checks.hasUpperCase
                          ? "text-green-400"
                          : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.checks.hasUpperCase ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>One uppercase letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordStrength.checks.hasLowerCase
                          ? "text-green-400"
                          : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.checks.hasLowerCase ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>One lowercase letter</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordStrength.checks.hasNumber
                          ? "text-green-400"
                          : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.checks.hasNumber ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>One number</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        passwordStrength.checks.hasSpecialChar
                          ? "text-green-400"
                          : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.checks.hasSpecialChar ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>One special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Only show error when field is touched, empty, or form was submitted */}
              {touched.password && !form.password && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  Password is required
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 disabled:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
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
                  Creating account...
                </span>
              ) : (
                "Create Account"
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Sign in to your existing account.{" "}
              <Link
                to="/login"
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;