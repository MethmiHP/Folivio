import { Mail } from "lucide-react";

const Footer = ({ centerAlign = false }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/90 border-t border-slate-800/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex flex-col ${centerAlign ? 'items-center justify-center text-center' : 'md:flex-row items-center justify-between'} gap-4`}>
          {/* Copyright */}
          <div className="text-sm text-slate-400">
            © {currentYear} <span className="font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Folivio</span>. All rights reserved.
          </div>

          {/* Email */}
          <a
            href="mailto:folivio.official@gmail.com"
            className={`flex items-center gap-2 text-sm text-slate-300 hover:text-teal-400 transition-colors duration-200 group ${centerAlign ? 'justify-center' : ''}`}
          >
            <Mail className="w-4 h-4 group-hover:text-teal-400 transition-colors" />
            <span className="group-hover:underline">folivio.official@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

