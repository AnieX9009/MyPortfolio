import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects', sectionId: 'projects' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Education', href: '#education', sectionId: 'education' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

export const SiteNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const sections = ['hero', 'showreel', 'projects', 'experience', 'skills', 'education', 'about', 'contact'];
    
    const handleScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 sm:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans text-xs">
          
          {/* Left Brand Title in Glass Pill */}
          <div className="bg-[#F3F1EA]/85 backdrop-blur-md border border-[#202022]/10 shadow-sm rounded-full px-5 py-2 pointer-events-auto">
            <button
              onClick={(e) => handleScrollTo(e, '#hero')}
              data-cursor="Home"
              data-magnetic
              className="font-medium text-[#202022] tracking-normal hover:opacity-80 transition-opacity text-left font-mono"
            >
              Animesh Mondal
            </button>
          </div>

          {/* Right Navigation Links in Glassmorphism Tab Bar */}
          <nav
            aria-label="Primary"
            className="flex items-center gap-3 sm:gap-5 bg-[#F3F1EA]/85 backdrop-blur-md border border-[#202022]/10 shadow-sm rounded-full px-5 sm:px-7 py-2 pointer-events-auto"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.sectionId;
              const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  data-cursor="Button"
                  data-magnetic
                  className={`relative font-medium py-0.5 transition-opacity duration-300 ${
                    isDimmed ? 'opacity-40' : 'opacity-100'
                  } ${isActive ? 'text-[#202022] font-semibold' : 'text-[#202022]'}`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#202022] transition-transform duration-300 ease-out origin-left ${
                      hoveredIndex === idx || isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

        </div>
      </header>
    </>
  );
};

export default SiteNavigation;
