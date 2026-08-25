import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

const NAV_ITEMS = [
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Experience', href: '#experience' },
  { index: '03', label: 'Skills', href: '#skills' },
  { index: '04', label: 'Projects', href: '#projects' },
  { index: '05', label: 'Education', href: '#education' },
  { index: '06', label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`section-container flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'glass rounded-2xl px-5 py-3 mx-4 md:mx-8 lg:mx-auto border border-white/10'
              : ''
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
            className="flex items-center gap-3 group"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-accent-cyan to-accent-purple flex items-center justify-center font-black text-white text-sm shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300">
              AM
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm leading-none group-hover:text-primary-300 transition-colors duration-300">
                {personalInfo.name}<span className="text-accent-cyan">.</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 leading-tight">FULL STACK & APP DEV</span>
            </div>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                id={`nav-${item.label.toLowerCase()}`}
                onClick={() => handleNav(item.href)}
                className={`relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeSection === item.href.replace('#', '') && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary-500/20 border border-primary-500/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="text-accent-cyan text-[10px] opacity-70">[{item.index}]</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden sm:inline-flex btn-primary text-xs py-2 px-4 font-mono"
              id="nav-hire-btn"
            >
              Get In Touch
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 glass rounded-lg flex flex-col items-center justify-center gap-1.5 group"
              id="nav-hamburger"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 mx-4 glass rounded-2xl p-6 lg:hidden border border-white/10"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between transition-all duration-200 ${
                    activeSection === item.href.replace('#', '')
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-accent-cyan opacity-60">[{item.index}]</span>
                </button>
              ))}
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-primary text-xs font-mono mt-3 justify-center py-3"
              >
                Get In Touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
