import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            ARS Studio
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('work')}
            className="text-sm text-white/60 hover:text-white transition-colors duration-300"
          >
            Work
          </button>
          <Link
            to="/pricing"
            className="text-sm text-white/60 hover:text-white transition-colors duration-300"
          >
            Pricing
          </Link>
          <button
            onClick={() => scrollToSection('process')}
            className="text-sm text-white/60 hover:text-white transition-colors duration-300"
          >
            Process
          </button>
          <Link
            to="/portfolio"
            className="text-sm text-white/60 hover:text-white transition-colors duration-300"
          >
            Portfolio
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || ''}
                    className="w-7 h-7 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 flex items-center justify-center text-xs text-white">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <button
                  onClick={() => logout()}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/start-project"
                className="btn-primary text-sm py-2 px-4"
              >
                Start Project
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/60 hover:text-white"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-white/5">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('work')}
              className="block text-sm text-white/60 hover:text-white"
            >
              Work
            </button>
            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-white/60 hover:text-white"
            >
              Pricing
            </Link>
            <button
              onClick={() => scrollToSection('process')}
              className="block text-sm text-white/60 hover:text-white"
            >
              Process
            </button>
            <Link
              to="/portfolio"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-white/60 hover:text-white"
            >
              Portfolio
            </Link>
            <div className="pt-4 border-t border-white/10">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-white/60 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/start-project"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary block text-center text-sm"
                >
                  Start Project
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
