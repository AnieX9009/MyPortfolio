import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiencesData } from '../data/portfolio';

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Track scroll progress for connecting path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-16 sm:py-20 px-6 sm:px-12 max-w-6xl mx-auto border-t border-[#202022]/10 relative select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-16 text-center sm:text-left">
        <motion.span
          initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono uppercase tracking-widest text-[#77756F] block mb-2"
        >
          CAREER FILES // DOSSIER
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, scale: 1.28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="text-4xl sm:text-5xl font-extrabold text-[#202022] uppercase tracking-tight"
        >
          Work Experience
        </motion.h2>
      </div>

      {/* SVG Connecting Path Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 280 160 C 650 230, 750 380, 720 500 C 690 620, 300 660, 280 760"
            stroke="#202022"
            strokeOpacity="0.12"
            strokeWidth="3"
            strokeDasharray="6 8"
          />
          <motion.path
            d="M 280 160 C 650 230, 750 380, 720 500 C 690 620, 300 660, 280 760"
            stroke="#202022"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Mobile Vertical Path Line */}
      <div className="absolute left-10 top-44 bottom-20 w-0.5 border-l-2 border-dashed border-[#202022]/20 block md:hidden pointer-events-none" />

      {/* Experience Folders List */}
      <div className="relative z-10 space-y-16 md:space-y-28">
        {experiencesData.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          const isOpen = hoveredIdx === idx;

          return (
          <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: isEven ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              className={`flex flex-col md:flex-row items-center ${
                isEven ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              {/* Compact 3D Orange Frosted Glass Folder Container (20% Shorter Height) */}
              <div
                className="relative w-full md:w-[520px] pt-6 cursor-pointer perspective-1000"
                style={{ transformStyle: 'preserve-3d', isolation: 'isolate' }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setHoveredIdx(isOpen ? null : idx)}
                data-cursor="Open"
              >
                {/* A. Dark Folder Backplate Base (Height decreased by 20%) */}
                <div className="relative w-full min-h-[130px] sm:min-h-[135px] bg-[#141416] rounded-2xl p-4 sm:p-5 shadow-xl border border-orange-500/20 flex flex-col justify-between overflow-visible">
                  
                  {/* Folder Tab Top Notch */}
                  <div className="absolute -top-5 left-5 px-4 py-1.5 rounded-t-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-mono text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md border-t border-x border-orange-400/30">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>FILE 0{idx + 1} // {exp.role}</span>
                  </div>

                  {/* B. SINGLE WHITE DOCUMENT SHEET (Slides up tightly with ZERO empty gap below!) */}
                  <motion.div
                    initial={false}
                    animate={
                      isOpen
                        ? {
                            y: -115,
                            scale: 1,
                            zIndex: 40,
                            boxShadow: '0 25px 50px -15px rgba(0,0,0,0.35)',
                          }
                        : {
                            y: -10,
                            scale: 0.97,
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="relative w-full bg-white text-[#202022] rounded-xl p-5 sm:p-7 border border-[#202022]/15 shadow-2xl pointer-events-auto"
                  >
                    {/* Top Document Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#202022]/10 mb-4">
                      <div>
                        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-widest block mb-1">
                          OFFICIAL EXPERIENCE RECORD // 0{idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#202022] tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-semibold text-[#77756F] mt-0.5">
                          {exp.company} <span className="font-normal">• {exp.location}</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#202022] text-[#F3F1EA] rounded-md uppercase tracking-wider self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    {/* Bullet Points Details (Crisp & Perfectly Connected) */}
                    <ul className="space-y-3 text-xs sm:text-sm text-[#202022]/90 leading-relaxed font-sans">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-xs font-mono text-orange-600 font-bold mt-0.5">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer Official Verification Line */}
                    <div className="mt-5 pt-3 border-t border-[#202022]/10 flex items-center justify-between text-[10px] font-mono text-[#77756F] uppercase">
                      <span>VERIFIED DOSSIER</span>
                      <span className="text-orange-600 font-bold">LUX // ASR TECH ★</span>
                    </div>
                  </motion.div>

                  {/* C. Orange Frosted Glass Front Flap (Decreased height by 20%, perfectly fitted) */}
                  <motion.div
                    animate={isOpen ? { rotateX: -10, y: 6, opacity: 0.95 } : { rotateX: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-x-0 bottom-0 top-6 z-20 bg-gradient-to-br from-orange-600/90 via-amber-600/85 to-orange-700/95 backdrop-blur-xl border border-orange-400/40 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden origin-bottom pointer-events-none"
                  >
                    {/* Glass Surface Specular Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

                    {/* Folder Title & Role Label */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md animate-pulse" />
                        <span className="font-extrabold tracking-wider uppercase text-sm sm:text-base text-white drop-shadow-sm">
                          {exp.role}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-extrabold text-white/80">
                        [FILE 0{idx + 1}]
                      </span>
                    </div>

                    {/* Company Name & Status Pill (Tightly placed without middle void) */}
                    <div className="relative z-10 pt-4 flex items-end justify-between border-t border-white/20">
                      <div>
                        <h4 className="font-sans text-base sm:text-lg font-black text-white tracking-wide uppercase drop-shadow-sm">
                          {exp.company}
                        </h4>
                        <p className="font-mono text-[11px] text-amber-100 font-bold mt-0.5">
                          {exp.location} // {exp.period}
                        </p>
                      </div>

                      <div className="px-3 py-1 rounded-full bg-black/60 text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-lg border border-white/25 backdrop-blur-md">
                        {isOpen ? 'DOCUMENT OPEN ▲' : 'HOVER / CLICK TO OPEN 📂'}
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;
