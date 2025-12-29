// import { useState } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { LayoutDashboard, LogOut, Menu, X, User } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import logoFinal from "../assets/logo_2.png";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { username } = useParams();

//   const isPublicPortfolio = location.pathname.startsWith("/portfolio/");

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } finally {
//       navigate("/login");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-800/30 bg-slate-950/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/60 shadow-xl shadow-black/5">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group relative">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
//               <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300 overflow-hidden group-hover:scale-105">
//                 <img 
//                   src={logoFinal} 
//                   alt="Folivio Logo" 
//                   className="w-full h-full object-contain p-2"
//                 />
//               </div>
//             </div>
//             <span className="font-extrabold text-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:via-cyan-300 group-hover:to-blue-300 transition-all duration-300">
//               Folivio
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-3">
//             {!isPublicPortfolio && user && (
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-cyan-500/10 hover:border-teal-500/20 border border-transparent transition-all duration-200 group"
//               >
//                 <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                 <span>Dashboard</span>
//               </Link>
//             )}

//             {user ? (
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 shadow-sm">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-sm opacity-60"></div>
//                     <div className="relative w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
//                       {user.username?.charAt(0).toUpperCase()}
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-semibold text-white leading-tight">{user.username}</span>
//                     <span className="text-xs text-slate-400 leading-tight">Account</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/40 hover:bg-red-500/10 text-slate-300 hover:text-red-400 font-medium border border-slate-700/50 hover:border-red-500/30 transition-all duration-200 group shadow-sm hover:shadow-red-500/10"
//                 >
//                   <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link
//                   to="/login"
//                   className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 transition-all duration-200"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-teal-500/20"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-700/50"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-slate-800/30 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
//             {!isPublicPortfolio && user && (
//               <Link
//                 to="/dashboard"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white font-medium hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-cyan-500/10 border border-transparent hover:border-teal-500/20 transition-all duration-200"
//               >
//                 <LayoutDashboard className="w-5 h-5" />
//                 <span>Dashboard</span>
//               </Link>
//             )}

//             {user ? (
//               <>
//                 <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 mb-2">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-sm opacity-60"></div>
//                     <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
//                       {user.username?.charAt(0).toUpperCase()}
//                     </div>
//                   </div>
//                   <div className="flex flex-col flex-1">
//                     <span className="text-sm font-semibold text-white leading-tight">{user.username}</span>
//                     <span className="text-xs text-slate-400 leading-tight">Account</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/40 hover:bg-red-500/10 text-slate-300 hover:text-red-400 font-medium border border-slate-700/50 hover:border-red-500/30 transition-all duration-200"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white font-medium hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 transition-all duration-200 text-center"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-center shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-200"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logoFinal from "../assets/logo_2.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  const isPublicPortfolio = location.pathname.startsWith("/portfolio/");

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop blur container */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xl border-b border-white/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500/90 to-cyan-600/90 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden group-hover:scale-105">
                <img 
                  src={logoFinal} 
                  alt="Folivio Logo" 
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent group-hover:from-teal-200 group-hover:via-cyan-200 group-hover:to-white transition-all duration-300">
              Folivio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 relative z-10">
            {!isPublicPortfolio && user && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:text-white font-medium hover:bg-white/10 backdrop-blur-sm border border-white/0 hover:border-white/10 transition-all duration-200 group"
              >
                <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Dashboard</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white/20">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white/90">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 font-medium border border-white/10 hover:border-red-400/30 backdrop-blur-sm transition-all duration-200 group"
                >
                  <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white font-medium hover:bg-white/10 backdrop-blur-sm border border-white/0 hover:border-white/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 border border-white/0 hover:border-white/10 relative z-10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-2 animate-in slide-in-from-top-2 duration-200 relative z-10">
            {!isPublicPortfolio && user && (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white font-medium hover:bg-white/10 backdrop-blur-sm border border-white/0 hover:border-white/10 transition-all duration-200"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            )}

            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"></div>
                    <div className="relative w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/20">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-semibold text-white/90">{user.username}</span>
                    <span className="text-xs text-white/50">Account</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 font-medium border border-white/10 hover:border-red-400/30 backdrop-blur-sm transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-white/70 hover:text-white font-medium hover:bg-white/10 backdrop-blur-sm border border-white/0 hover:border-white/10 transition-all duration-200 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-center shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-200 border border-white/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;