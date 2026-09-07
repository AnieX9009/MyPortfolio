import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { educationData, languagesData } from '../data/portfolio';

// Academic descriptions for the milestones
const educationDescriptions = [
  'Built strong analytical and problem-solving foundations with emphasis on science, mathematics, and academic discipline.',
  'Specialized in Physics, Chemistry, and Advanced Mathematics, developing rigorous computational and quantitative skills.',
  'Comprehensive 4-year engineering curriculum focused on Data Structures, Algorithms, Full-Stack Architecture, and Machine Learning.',
];

export const EducationSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollActiveStep, setScrollActiveStep] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Pinned scroll tracking across the 220vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map the pinned scroll (0 -> 0.90) directly to SVG path length (0 -> 1)
  const pathLength = useTransform(scrollYProgress, [0.06, 0.90], [0, 1]);

  // Track progress during screen freeze:
  // - progress >= 0.18: Touches Point 1 -> 1 turns Orange
  // - progress >= 0.48: Touches Point 2 -> 2 turns Orange
  // - progress >= 0.78: Touches Point 3 -> 3 turns Orange
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.78) {
      setScrollActiveStep(3); // Touched Point 3
    } else if (progress >= 0.48) {
      setScrollActiveStep(2); // Touched Point 2
    } else if (progress >= 0.18) {
      setScrollActiveStep(1); // Touched Point 1
    } else {
      setScrollActiveStep(0); // Before Point 1 (all Black)
    }
  });

  // Desktop SVG Path for the undulating orange wave
  // Starts on left at (20, 200), dips into Node 1 at (160, 270), sweeps into Node 2 at (490, 210), climbs to Node 3 at (810, 80), trails off to (940, 65)
  const desktopWavePath = "M 20 200 C 60 220, 100 270, 160 270 C 270 270, 370 210, 490 210 C 620 210, 710 100, 810 80 C 850 70, 890 65, 940 65";

  // Coordinates for the 3 desktop nodes along the SVG viewBox="0 0 950 350"
  const desktopNodes = [
    { x: 160, y: 270, cardLeft: '17%', cardTop: '295px' },
    { x: 490, y: 210, cardLeft: '51.5%', cardTop: '235px' },
    { x: 810, y: 80, cardLeft: '85.5%', cardTop: '105px' },
  ];

  return (
    <section id="education" className="relative w-full select-none">
      
      {/* ════════════════════════════════════════════════════════════════════════
          PART 1: PINNED / SCREEN-FROZEN SCROLL SECTION (220vh Scroll Track)
          When user arrives, screen pins in place while mouse scroll drives the line 1 -> 3
         ════════════════════════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="relative h-[220vh] w-full">
        
        {/* Sticky Viewport Container (Locks in place while user scrolls) */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-6">
          
          {/* Ambient background decorative circle */}
          <div className="absolute right-[-80px] top-[100px] w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-br from-[#E65A2B]/10 via-[#3B82F6]/5 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Top Main Flex Container */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 my-auto w-full">

            {/* ── LEFT COLUMN: TITLE, BADGE, NARRATIVE & ACTION BUTTON ── */}
            <div className="w-full lg:w-[32%] lg:max-w-md shrink-0">
              {/* Category Pill Tag */}
              <motion.div
                initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-3"
              >
                <span className="w-2 h-2 rounded-full bg-[#E65A2B] inline-block animate-pulse" />
                <span>ACADEMIC FOUNDATION</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, scale: 1.28, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-[1.12] mb-4"
              >
                MY EDUCATION
              </motion.h2>

              {/* Subtitle / Narrative */}
              <motion.p
                initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="text-xs sm:text-sm text-[#77756F] font-sans leading-relaxed mb-6"
              >
                From strong school fundamentals in science and mathematics to graduating in Computer Science Engineering with an 8.5 GPA, each milestone has built the rigorous foundation for scalable software development.
              </motion.p>

              {/* Orange CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#E65A2B] text-white hover:bg-[#d84e20] shadow-[0_8px_24px_rgba(230,90,43,0.3)] hover:shadow-[0_12px_32px_rgba(230,90,43,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 font-sans text-xs sm:text-sm font-bold tracking-wide group"
                >
                  <span>Get In Touch</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: DESKTOP PINNED MOUSE-SCROLL ORANGE WAVY LINE WITH CHECKPOINT NODES ── */}
            <div className="hidden lg:block w-full lg:w-[68%] relative min-h-[480px]">
              
              {/* SVG Animated Orange Line with Glow & Node Rings */}
              <svg
                viewBox="0 0 950 350"
                fill="none"
                className="w-full h-auto overflow-visible relative z-10"
              >
                <defs>
                  {/* Soft ambient orange glow filter */}
                  <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E65A2B" />
                    <stop offset="50%" stopColor="#FF6B4A" />
                    <stop offset="100%" stopColor="#E65A2B" />
                  </linearGradient>
                </defs>

                {/* 1. Ambient Background Subtle Guide Trail */}
                <path
                  d={desktopWavePath}
                  fill="none"
                  stroke="#E65A2B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.12"
                />

                {/* 2. Scroll-Driven Glowing Orange Path */}
                <motion.path
                  d={desktopWavePath}
                  fill="none"
                  stroke="#E65A2B"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.28"
                  filter="url(#orange-glow)"
                  style={{ pathLength }}
                />

                {/* 3. Primary Crisp Orange Stroke Connected Directly to Mouse Scroll */}
                <motion.path
                  d={desktopWavePath}
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength }}
                />

                {/* 4. Active Flowing Light Beam */}
                <motion.path
                  d={desktopWavePath}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="24 160"
                  initial={{ strokeDashoffset: 400 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  opacity="0.75"
                />

                {/* 3 Node Markers on the Curve (Highlighted when orange line arrives at them) */}
                {desktopNodes.map((node, i) => {
                  const isHovered = hoveredIdx === i;
                  const isPointReached = isHovered || scrollActiveStep >= (i + 1);

                  return (
                    <g
                      key={i}
                      className="cursor-pointer transition-all duration-500"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Outer Pulsing Aura Ring */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isPointReached ? 22 : 14}
                        fill="#E65A2B"
                        fillOpacity={isPointReached ? 0.35 : 0.12}
                        animate={{ scale: isPointReached ? [1, 1.15, 1] : 1 }}
                        transition={{ repeat: isPointReached ? Infinity : 0, duration: 2 }}
                      />

                      {/* Beacon Ping Ring (when reached) */}
                      {isPointReached && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="26"
                          fill="none"
                          stroke="#E65A2B"
                          strokeWidth="1.5"
                          opacity="0.5"
                          className="animate-ping origin-center"
                        />
                      )}

                      {/* White Outer Ring Container with Shadow */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isPointReached ? "12" : "10"}
                        fill="#FFFFFF"
                        stroke="#E65A2B"
                        strokeWidth={isPointReached ? "3.5" : "2.5"}
                        className="transition-all duration-300 shadow-md"
                      />

                      {/* Inner Center Dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isPointReached ? "6" : "4"}
                        fill={isPointReached ? "#E65A2B" : "#111827"}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* 3 Milestone Cards with Watermark Numbers (1, 2, 3) */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {educationData.map((edu, idx) => {
                  const node = desktopNodes[idx];
                  const isHovered = hoveredIdx === idx;
                  const isPointReached = isHovered || scrollActiveStep >= (idx + 1);
                  const stepNumber = idx + 1;

                  return (
                    <div
                      key={edu.degree}
                      style={{
                        left: node.cardLeft,
                        top: node.cardTop,
                        transform: 'translate(-50%, 0)',
                      }}
                      className="absolute w-[245px] pointer-events-auto group"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Giant Number (1, 2, 3) — Initially Black, turns ORANGE when the line arrives */}
                      <div
                        className={`absolute -top-14 -right-2 text-[120px] font-black font-sans select-none pointer-events-none leading-none transition-all duration-500 ${
                          isPointReached
                            ? 'text-[#E65A2B] opacity-90 scale-105 drop-shadow-[0_4px_20px_rgba(230,90,43,0.35)]'
                            : 'text-[#111827] opacity-25 scale-100'
                        }`}
                      >
                        {stepNumber}
                      </div>

                      {/* Milestone Card Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: false, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.15 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative z-10 pt-2 p-3 rounded-2xl transition-all duration-500 ${
                          isPointReached
                            ? 'bg-white/95 backdrop-blur-xs shadow-[0_8px_30px_rgba(230,90,43,0.08)] border border-[#E65A2B]/35 translate-y-[-4px]'
                            : 'bg-transparent border border-transparent'
                        }`}
                      >
                        {/* Period & Score Header Pills */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77756F] bg-gray-100/90 px-2.5 py-0.5 rounded-full border border-gray-200/80 shadow-xs">
                            {edu.period}
                          </span>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                            isPointReached
                              ? 'bg-[#E65A2B] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {edu.gpa}
                          </span>
                        </div>

                        {/* Degree Title */}
                        <h3 className={`text-base font-extrabold font-sans leading-snug mb-1 transition-colors duration-300 ${
                          isPointReached ? 'text-[#E65A2B]' : 'text-[#111827]'
                        }`}>
                          {edu.degree}
                        </h3>

                        {/* Institution */}
                        <p className="text-xs font-semibold text-[#4B5563] mb-2 leading-tight">
                          {edu.institution}
                        </p>

                        {/* Description narrative snippet */}
                        <p className="text-[11px] text-[#77756F] leading-relaxed">
                          {educationDescriptions[idx]}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RESPONSIVE MOBILE / TABLET FLOW (< LG) ── */}
            <div className="block lg:hidden w-full relative">
              <div className="relative pl-6 sm:pl-10 space-y-8">

                {/* Continuous Vertical Curved Path on Left */}
                <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#E65A2B] via-[#FF7A45] to-[#E65A2B]/30 shadow-[0_0_12px_rgba(230,90,43,0.4)]" />

                {educationData.map((edu, idx) => {
                  const stepNumber = idx + 1;
                  const isPointReached = scrollActiveStep >= (idx + 1);

                  return (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: false, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative group bg-white p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                        isPointReached
                          ? 'border-[#E65A2B]/50 shadow-[0_12px_32px_rgba(230,90,43,0.12)]'
                          : 'border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                      }`}
                    >
                      {/* Glowing Node on the Vertical Line */}
                      <div className={`absolute -left-[30px] sm:-left-[46px] top-5 w-7 h-7 rounded-full bg-white border-2 transition-colors duration-300 flex items-center justify-center ${
                        isPointReached ? 'border-[#E65A2B] shadow-md' : 'border-gray-300'
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isPointReached ? 'bg-[#E65A2B] scale-125' : 'bg-gray-400'
                        }`} />
                      </div>

                      {/* Giant Number Background on Mobile */}
                      <div className={`absolute right-4 top-2 text-6xl font-black font-sans pointer-events-none select-none transition-colors duration-500 ${
                        isPointReached ? 'text-[#E65A2B] opacity-80' : 'text-[#111827] opacity-25'
                      }`}>
                        {stepNumber}
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77756F] bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                            {edu.period}
                          </span>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                            isPointReached ? 'bg-[#E65A2B] text-white' : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {edu.gpa}
                          </span>
                        </div>

                        <h3 className={`text-base font-extrabold font-sans transition-colors mb-0.5 ${
                          isPointReached ? 'text-[#E65A2B]' : 'text-[#111827]'
                        }`}>
                          {edu.degree}
                        </h3>

                        <p className="text-xs font-semibold text-[#4B5563] mb-1.5">
                          {edu.institution}
                        </p>

                        <p className="text-xs text-[#77756F] leading-relaxed">
                          {educationDescriptions[idx]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PART 2: GLOBAL FLUENCY & LANGUAGE PROFICIENCY SECTION (Unpinned Normal Flow)
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-gray-200/80">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#E65A2B] inline-block" />
              <span>COMMUNICATION & FLUENCY</span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, scale: 1.25, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#111827] uppercase tracking-tight"
            >
              LANGUAGES & PROFICIENCY
            </motion.h3>
          </div>

          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            className="text-xs font-mono text-[#77756F] uppercase tracking-wider"
          >
            CEFR FRAMEWORK STANDARDS
          </motion.span>
        </div>

        {/* 3-Column Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languagesData.map((lang, idx) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
              className="group p-6 bg-white rounded-2xl border border-gray-200/80 hover:border-[#E65A2B]/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-[#E65A2B] text-white font-mono text-xs font-bold rounded-md shadow-sm">
                    {lang.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#77756F] group-hover:text-[#111827] transition-colors">
                    {lang.percentage}%
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-[#111827] uppercase tracking-tight mb-1 group-hover:text-[#E65A2B] transition-colors duration-300">
                  {lang.name}
                </h4>

                <p className="text-xs font-mono text-[#77756F] uppercase tracking-wider mb-6">
                  {lang.proficiency}
                </p>
              </div>

              <div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3 p-0.5 border border-gray-200/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.15 }}
                    className="h-full bg-gradient-to-r from-[#E65A2B] to-[#FF8C38] rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#77756F] group-hover:text-[#111827] transition-colors">
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
