import { Link } from "react-router-dom";
import { Sparkles, Palette, Zap, Globe, ArrowRight, Check } from "lucide-react";
import logoFinal from "../assets/logo_2.png";
import Footer from "../components/Footer";

const Home = () => {
  
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description: "Describe your vision and let AI create your portfolio content and design automatically.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Designs",
      description: "Choose from beautiful templates or create your own custom design with AI assistance.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Preview",
      description: "See your portfolio come to life in real-time as you edit. No coding required.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Instant Publishing",
      description: "Get your portfolio URL instantly. Share it with anyone, anywhere.",
    },
  ];

  const benefits = [
    "No coding skills required",
    "Multiple professional templates",
    "AI-powered content generation",
    "Custom design creation",
    "PDF export support",
    "Free to use",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
        
        {/* Floating particles - Small circles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400/25 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/5 w-2.5 h-2.5 bg-purple-400/25 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-teal-300/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/5 right-1/5 w-3 h-3 bg-cyan-300/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-300/25 rounded-full animate-float"></div>
        <div className="absolute top-2/3 left-2/3 w-2.5 h-2.5 bg-teal-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/5 right-1/4 w-2 h-2 bg-cyan-400/25 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/6 left-1/2 w-3 h-3 bg-indigo-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-1/2 right-1/5 w-2 h-2 bg-purple-300/25 rounded-full animate-float-delayed"></div>
        <div className="absolute top-5/6 left-1/6 w-2.5 h-2.5 bg-blue-400/20 rounded-full animate-float-slow"></div>
        
        {/* Medium floating circles */}
        <div className="absolute top-1/3 left-3/4 w-4 h-4 bg-teal-500/15 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-1/3 right-2/3 w-5 h-5 bg-cyan-500/15 rounded-full animate-float-delayed blur-sm"></div>
        <div className="absolute top-2/3 right-1/6 w-4 h-4 bg-blue-500/15 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute bottom-2/3 left-2/3 w-5 h-5 bg-purple-500/15 rounded-full animate-float blur-sm"></div>
        
        {/* Large floating circles */}
        <div className="absolute top-1/5 right-1/3 w-20 h-20 bg-teal-500/10 rounded-full animate-float-slow blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/5 w-24 h-24 bg-cyan-500/10 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-3/5 right-1/5 w-20 h-20 bg-blue-500/10 rounded-full animate-float-delayed blur-2xl"></div>
        <div className="absolute bottom-1/2 left-3/4 w-24 h-24 bg-indigo-500/10 rounded-full animate-float-slow blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            {/* Logo - Animated Entry */}
            <div className="flex justify-center mb-8 animate-fade-in-down">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/50 overflow-hidden m-10 hover:scale-110 hover:rotate-3 transition-all duration-500 animate-bounce-subtle">
                <img 
                  src={logoFinal} 
                  alt="Folivio Logo" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Main Heading - Staggered Animation */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up inline-block">
                Build Your Portfolio
              </span>
              <br />
              <span className="text-white animate-fade-in-up inline-block" style={{ animationDelay: '200ms' }}>
                Without Writing Code
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Create stunning, professional portfolios in minutes. Powered by AI, designed for everyone.
            </p>

            {/* CTA Buttons - Animated Entry */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/50 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Powerful features to create and showcase your work professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 hover:border-teal-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 md:p-12 hover:border-slate-700/50 transition-all duration-500 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  About <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Folivio</span>
                </h2>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  Folivio is a modern portfolio builder that makes it easy for anyone to create a professional online presence. 
                  Whether you're a developer, designer, or creative professional, we help you showcase your work beautifully.
                </p>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Our AI-powered platform generates content and designs based on your preferences, saving you hours of work. 
                  No technical skills needed—just describe what you want, and we'll make it happen.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 text-slate-300 animate-fade-in-left hover:text-teal-400 transition-colors duration-200"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 animate-fade-in-right">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 transform">
                  <h3 className="text-xl font-semibold text-white mb-3">Quick Start</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Sign up in seconds, describe your experience, and get a fully customized portfolio ready to share.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transform" style={{ animationDelay: '100ms' }}>
                  <h3 className="text-xl font-semibold text-white mb-3">Customize Everything</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Edit every detail, choose from templates, or let AI create a unique design based on your vision.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transform" style={{ animationDelay: '200ms' }}>
                  <h3 className="text-xl font-semibold text-white mb-3">Share Instantly</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Get your portfolio URL immediately. Share it on social media, resumes, or anywhere you want.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-blue-600/20 rounded-3xl p-12 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-500 animate-fade-in-up hover:shadow-2xl hover:shadow-teal-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Join thousands of professionals who have created stunning portfolios with Folivio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Create Your Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/50 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Sign In to Your Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer centerAlign={true} />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes floatDelayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-25px) translateX(15px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;