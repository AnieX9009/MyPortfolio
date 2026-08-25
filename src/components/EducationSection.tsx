import React from 'react';
import { motion } from 'framer-motion';
import { educationData, languagesData } from '../data/portfolio';

// Icons for academic steps
const EducationIcons = [
  // Class X - School / Foundation icon
  <svg key="x" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>,
  // Class XII - Science / Higher Secondary icon
  <svg key="xii" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31L4.75 18.27A2 2 0 0 0 6.47 21h11.06a2 2 0 0 0 1.72-2.73L14 9.31V2" />
    <line x1="8.5" y1="2" x2="15.5" y2="2" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>,
  // B.Tech - Graduation / Engineering Cap icon
  <svg key="btech" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>,
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Subtle top border divider */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-[#202022]/10" />

      {/* ── SECTION HEADER (Inspired by reference image design: Dot accent + Uppercase title) ── */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E65A2B] inline-block animate-pulse" />
          <span>MY ACADEMIC JOURNEY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-[#202022] uppercase tracking-tight leading-none"
        >
          EDUCATION & LANGUAGES.
        </motion.h2>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PART 1: PROCESS-TIMELINE STYLE EDUCATION STEPS (01, 02, 03)
          Directly inspired by the "MY PROCESS" horizontal timeline in reference image
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="mb-24">
        {/* Timeline Connecting Line (Visible on Desktop) */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-[60px] right-[60px] h-[2px] bg-[#202022]/10 z-0">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#E65A2B] via-[#E65A2B] to-[#202022]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {educationData.map((edu, idx) => {
              const stepNumber = String(idx + 1).padStart(2, '0');
              const isLatest = idx === educationData.length - 1;

              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.18 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Step Header: Large Orange Number (01, 02, 03) + Indicator Dot */}
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-5xl sm:text-6xl font-black font-mono text-[#E65A2B] tracking-tighter group-hover:scale-105 transition-transform duration-300">
                      {stepNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#77756F] bg-[#202022]/5 px-3 py-1 rounded-full border border-[#202022]/10">
                        {edu.period}
                      </span>
                      {isLatest && (
                        <span className="px-2.5 py-1 bg-[#E65A2B] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-full shadow-sm">
                          HIGHEST
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className="p-7 bg-[#FBFBFA] rounded-2xl border border-[#202022]/10 group-hover:border-[#E65A2B]/50 group-hover:bg-white group-hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                    <div>
                      {/* Icon + Degree Title */}
                      <div className="flex items-center gap-3 mb-3 text-[#202022]">
                        <div className="p-2.5 rounded-xl bg-[#202022]/5 text-[#E65A2B] group-hover:bg-[#E65A2B] group-hover:text-white transition-colors duration-300">
                          {EducationIcons[idx % EducationIcons.length]}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#202022] group-hover:text-[#E65A2B] transition-colors duration-300">
                          {edu.degree}
                        </h3>
                      </div>

                      {/* Institution */}
                      <p className="text-sm font-medium text-[#4a4a4d] leading-relaxed mb-6">
                        {edu.institution}
                      </p>
                    </div>

                    {/* Bottom GPA Badge & Arrow link effect */}
                    <div className="pt-4 border-t border-[#202022]/10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 bg-[#202022] text-[#F3F1EA] rounded-lg group-hover:bg-[#E65A2B] transition-colors duration-300">
                        <span>SCORE:</span>
                        <span>{edu.gpa.replace('GPA: ', '')}</span>
                      </span>

                      <span className="text-xs font-mono font-bold text-[#E65A2B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                        COMPLETED <span className="text-sm">→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PART 2: LANGUAGES & COMMUNICATION CARDS
          Inspired by the "SERVICES" and "WHAT CLIENTS SAY" cards in reference image
         ════════════════════════════════════════════════════════════════════════ */}
      <div>
        {/* Subsection Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E65A2B] inline-block" />
              <span>GLOBAL FLUENCY</span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#202022] uppercase tracking-tight"
            >
              LANGUAGES & PROFICIENCY
            </motion.h3>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#77756F] uppercase tracking-wider"
          >
            CEFR FRAMEWORK STANDARDS
          </motion.span>
        </div>

        {/* 3-Column Grid spanning full width for Bengali, English, Hindi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languagesData.map((lang, idx) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group p-6 bg-[#FBFBFA] rounded-2xl border border-[#202022]/10 hover:border-[#E65A2B]/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Level Tag (C2, B2, A2) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-[#E65A2B] text-white font-mono text-xs font-bold rounded-md shadow-sm">
                    {lang.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#77756F] group-hover:text-[#202022] transition-colors">
                    {lang.percentage}%
                  </span>
                </div>

                {/* Language Name */}
                <h4 className="text-xl font-extrabold text-[#202022] uppercase tracking-tight mb-1 group-hover:text-[#E65A2B] transition-colors duration-300">
                  {lang.name}
                </h4>

                {/* Proficiency Label */}
                <p className="text-xs font-mono text-[#77756F] uppercase tracking-wider mb-6">
                  {lang.proficiency}
                </p>
              </div>

              {/* Progress Bar with Orange Fill */}
              <div>
                <div className="w-full h-2 bg-[#202022]/10 rounded-full overflow-hidden mb-4 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
                    className="h-full bg-gradient-to-r from-[#E65A2B] to-[#FF8C38] rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#77756F] group-hover:text-[#202022] transition-colors">
                  <span>FLUENCY</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300 text-[#E65A2B] font-bold">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
