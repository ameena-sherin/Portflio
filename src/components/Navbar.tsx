import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Check, FileText, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'INTERNSHIPS', href: '#internships' },
    { name: 'WORK', href: '#work' },
    { name: 'TECH STACK', href: '#techstack' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'about', 'internships', 'work', 'techstack', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.emailRaw);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <>
      {/* Top Main Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-12 py-3 sm:py-4 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl shadow-purple-950/20'
            : 'bg-transparent pt-4 sm:pt-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand Monogram / Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lavender-600 via-purple-600 to-accentPink-500 flex items-center justify-center text-white font-bold text-xs tracking-tighter shadow-md shadow-purple-500/25 shrink-0">
              AS
            </div>
            <span className="text-sm sm:text-base font-display font-bold tracking-tight text-white group-hover:text-lavender-300 transition-colors">
              AMEENA SHERIN
            </span>
          </a>

          {/* Center: Connect with me / Email — desktop only */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleCopyEmail}
              className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lavender-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
              title="Click to copy email address"
            >
              <Mail className="w-3.5 h-3.5 text-lavender-400 group-hover:text-accentPink-400 transition-colors" />
              <span>{PERSONAL_INFO.links.emailRaw}</span>
              {copiedEmail ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold ml-1">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400">
                  (copy)
                </span>
              )}
            </button>
          </div>

          {/* Right Navigation Links & Resume Button — desktop */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
              {navLinks.map((link) => {
                const id = link.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 -z-10 shadow-md shadow-purple-600/30" />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <button
              onClick={onOpenResume}
              className="ml-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-lavender-600 via-purple-600 to-accentPink-600 hover:opacity-90 text-white text-xs font-mono font-semibold tracking-wide flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-transform hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-lavender-200 text-xs font-mono"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-[#07070b]/98 backdrop-blur-2xl z-50 flex flex-col animate-fadeIn">
            {/* Mobile menu close button */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lavender-600 via-purple-600 to-accentPink-500 flex items-center justify-center text-white font-bold text-xs">
                  AS
                </div>
                <span className="text-sm font-display font-bold text-white">
                  AMEENA SHERIN
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/10 text-white border border-white/15"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links — large touch targets */}
            <nav className="flex flex-col gap-1 px-5 pt-6 flex-1">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-display font-bold text-slate-200 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="text-xs font-mono text-lavender-400 w-5 text-right">
                    0{idx + 1}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-display font-bold text-lavender-300 hover:text-white hover:bg-purple-500/10 transition-colors mt-2"
              >
                <FileText className="w-5 h-5 text-lavender-400" />
                <span>VIEW RESUME</span>
              </button>
            </nav>

            {/* Bottom: Social & Email */}
            <div className="px-5 pb-8 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between mb-4 text-xs font-mono">
                <span className="text-slate-400 truncate mr-2">{PERSONAL_INFO.links.emailRaw}</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-lavender-300 font-bold shrink-0"
                >
                  {copiedEmail ? '✓ Copied!' : 'Copy Email'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Vertical Social Navigation (Pinned Left - Exactly like Reference) */}
      <aside className="fixed left-5 sm:left-7 bottom-8 z-30 hidden md:flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Ameena Sherin GitHub"
            className="p-2 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 transition-all border border-transparent hover:border-white/15"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Ameena Sherin LinkedIn"
            className="p-2 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 transition-all border border-transparent hover:border-white/15"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Ameena Sherin Instagram"
            className="p-2 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 transition-all border border-transparent hover:border-white/15"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Vertical line connecting to bottom */}
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
      </aside>
    </>
  );
};
