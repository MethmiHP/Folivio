import { Link } from "react-router-dom";
import { Sparkles, Palette, Zap, Globe, ArrowRight, Check } from "lucide-react";
import logoFinal from "../assets/logo-final.png";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/50 overflow-hidden">
                <img 
                  src={logoFinal} 
                  alt="Folivio Logo" 
                  className="w-full h-full object-contain p-3"
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Build Your Portfolio
              </span>
              <br />
              <span className="text-white">Without Writing Code</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create stunning, professional portfolios in minutes. Powered by AI, designed for everyone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
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
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 hover:border-teal-500/50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
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
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl p-6 border border-teal-500/30">
                  <h3 className="text-xl font-semibold text-white mb-3">Quick Start</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Sign up in seconds, describe your experience, and get a fully customized portfolio ready to share.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-white mb-3">Customize Everything</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Edit every detail, choose from templates, or let AI create a unique design based on your vision.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-2xl p-6 border border-blue-500/30">
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
          <div className="text-center bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-blue-600/20 rounded-3xl p-12 border border-teal-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have created stunning portfolios with Folivio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Create Your Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Sign In to Your Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

