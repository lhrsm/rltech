import React, { useState, useEffect } from 'react';
import { 
  List, 
  X 
} from 'react-bootstrap-icons';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onOpenRfp?: () => void;
  onOpenCommand?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navbar.about, href: '#sobre' },
    { label: t.navbar.services, href: '#servicos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-150 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2.5 shadow-xs'
          : 'bg-white/80 backdrop-blur-xs border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Image & Text */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a6b3b] rounded-md py-0.5"
            aria-label="RL Tech - Home"
          >
            <img 
              src="/logo.png" 
              alt="RL Tech Logo" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans">
              RL Tech
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-[#0a6b3b] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher (PT / EN) */}
            <div className="flex items-center bg-slate-100/90 border border-slate-200 rounded-lg p-0.5 text-xs font-semibold select-none">
              <button
                type="button"
                onClick={() => setLang('pt')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'pt'
                    ? 'bg-white text-[#0a6b3b] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Selecionar idioma Português"
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#0a6b3b] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Select English language"
              >
                EN
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md border border-slate-200 hover:bg-slate-100"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <List className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 bg-white border border-slate-200 rounded-lg shadow-lg flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0a6b3b] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
