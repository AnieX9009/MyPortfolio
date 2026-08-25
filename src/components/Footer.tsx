import { personalInfo } from '../data/portfolio';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-white/10 relative bg-dark-900 font-mono text-xs">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center font-black text-white text-[10px]">
              AM
            </div>
            <span className="text-slate-400 font-semibold">
              {personalInfo.name}
            </span>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-center text-[11px]">
            © {year} {personalInfo.name}. All rights reserved.
          </p>

          {/* Contact quick link */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-accent-cyan hover:underline transition-all"
            id="footer-email"
          >
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
