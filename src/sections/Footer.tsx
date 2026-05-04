import { Link } from 'react-router';
import { Sparkles, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Big Typography */}
        <div className="text-center mb-16">
          <h2 className="text-[8vw] sm:text-[6vw] font-bold text-white/5 leading-none tracking-tighter select-none">
            ANAS RAJPUT
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">ARS Studio</span>
            </Link>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Premium video editing and motion design studio. Turning raw ideas into high-performing visual content since 2020.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white/30 mb-4">Navigation</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-white/50 hover:text-white transition-colors">Home</Link>
              <Link to="/pricing" className="block text-sm text-white/50 hover:text-white transition-colors">Pricing</Link>
              <Link to="/portfolio" className="block text-sm text-white/50 hover:text-white transition-colors">Portfolio</Link>
              <Link to="/start-project" className="block text-sm text-white/50 hover:text-white transition-colors">Start Project</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white/30 mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert('Coming soon'); }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#7C3AED]/50 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert('Coming soon'); }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#7C3AED]/50 transition-colors"
              >
                <Youtube className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert('Coming soon'); }}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#7C3AED]/50 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="mailto:contact@arsstudio.com"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[#7C3AED]/50 transition-colors"
              >
                <Mail className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} ARS Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Crafted by Anas Rajput
          </p>
        </div>
      </div>
    </footer>
  );
}
