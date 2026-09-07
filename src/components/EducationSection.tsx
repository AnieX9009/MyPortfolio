import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { educationData, languagesData } from '../data/portfolio';

// Academic descriptions for the milestones
const educationDescriptions = [
  'Built strong analytical and problem-solving foundations with emphasis on science, mathematics, and academic discipline.',
  'Specialized in Physics, Chemistry, and Advanced Mathematics, developing rigorous computational and quantitative skills.',
  'Comprehensive 4-year engineering curriculum focused on Data Structures, Algorithms, Full-Stack Architecture, and Machine Learning.',
];

export const EducationSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoActiveStep, setAutoActiveStep] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });

  // Scroll-linked progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "center 35%"],
  });

  // Transform scroll progress to line stroke length (0 to 1)
  const scrollPathLength = useTransform(scrollYProgress, [0.05, 0.9], [0.05, 1]);

  // Timed sequential progression when scrolled into view (1 -> 2 -> 3)
  useEffect(() => {
    if (!isInView) {
      setAutoActiveStep(0);
      return;
    }

    // Sequentially highlight points 1, 2, and 3
    const t1 = setTimeout(() => setAutoActiveStep(0), 200);   // Step 1
    const t2 = setTimeout(() => setAutoActiveStep(1), 1200);  // Step 2
    const t3 = setTimeout(() => setAutoActiveStep(2), 2200);  // Step 3
    const t4 = setTimeout(() => setAutoActiveStep(3), 3200);  // All highlighted

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView]);

  // Desktop SVG Path for the undulating orange wave
  // Starts on left at (20, 200), dips into Node 1 at (160, 270), sweeps into Node 2 at (490, 210), climbs to Node 3 at (810, 80), trails off to (930, 65)
  const desktopWavePath = "M 20 200 C 60 220, 100 270, 160 270 C 270 270, 370 210, 490 210 C 620 210, 710 100, 810 80 C 850 70, 890 65, 930 65";

  // Coordinates for the 3 desktop nodes along the SVG viewBox="0 0 950 350"
  const desktopNodes = [
    { x: 160, y: 270, cardLeft: '17%', cardTop: '295px' },
    { x: 490, y: 210, cardLeft: '51.5%', cardTop: '235px' },
    { x: 810, y: 80, cardLeft: '85.5%', cardTop: '105px' },
  ];

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto select-none overflow-hidden"
    >
      {/* Ambient background decorative circle */}
      <div className="absolute right-[-80px] top-[100px] w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-br from-[#E65A2B]/10 via-[#3B82F6]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ════════════════════════════════════════════════════════════════════════
          TOP MAIN CONTAINER: LEFT HEADLINE + RIGHT ANIMATED ORANGE WAVE TIMELINE
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 mb-28">

        {/* ── LEFT COLUMN: TITLE, BADGE, NARRATIVE & ACTION BUTTON ── */}
        <div className="w-full lg:w-[32%] lg:max-w-md shrink-0 pt-2">
          {/* Category Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-3.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#E65A2B] inline-block animate-pulse" />
            <span>ACADEMIC FOUNDATION</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] tracking-tight leading-[1.12] mb-5"
          >
            MY EDUCATION
          </motion.h2>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#77756F] font-sans leading-relaxed mb-7"
          >
            From strong school fundamentals in science and mathematics to graduating in Computer Science Engineering with an 8.5 GPA, each milestone has built the rigorous foundation for scalable software development.
          </motion.p>

          {/* Orange CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#E65A2B] text-white hover:bg-[#d84e20] shadow-[0_8px_24px_rgba(230,90,43,0.3)] hover:shadow-[0_12px_32px_rgba(230,90,43,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 font-sans text-xs sm:text-sm font-bold tracking-wide group"
            >
              <span>Get In Touch</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: DESKTOP ANIMATED ORANGE WAVY LINE WITH CHECKPOINT NODES ── */}
        <div className="hidden lg:block w-full lg:w-[68%] relative min-h-[520px]">
          
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

            {/* 1. Ambient Background Guide Trail */}
            <path
              d={desktopWavePath}
              fill="none"
              stroke="#E65A2B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
            />

            {/* 2. Scroll-Linked / In-View Animated Orange Glow Path */}
            <motion.path
              d={desktopWavePath}
              fill="none"
              stroke="#E65A2B"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.28"
              filter="url(#orange-glow)"
              style={{ pathLength: scrollPathLength }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* 3. Primary Crisp Animated Orange Stroke */}
            <motion.path
              d={desktopWavePath}
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: scrollPathLength }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* 4. Active Glowing Energy Light Beam */}
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

            {/* 3 Node Markers Drawn Directly On the SVG Curve (Sequentially Highlighted 1 -> 2 -> 3) */}
            {desktopNodes.map((node, i) => {
              const isHovered = hoveredIdx === i;
              const isStepActive = isHovered || autoActiveStep >= i;

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
                    r={isStepActive ? 22 : 14}
                    fill="#E65A2B"
                    fillOpacity={isStepActive ? 0.35 : 0.12}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.7, duration: 0.6 }}
                  />

                  {/* Beacon Ping Ring (when active) */}
                  {isStepActive && (
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
                    r={isStepActive ? "12" : "10"}
                    fill="#FFFFFF"
                    stroke="#E65A2B"
                    strokeWidth={isStepActive ? "3.5" : "2.5"}
                    className="transition-all duration-300 shadow-md"
                  />

                  {/* Inner Solid Center Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isStepActive ? "6" : "4"}
                    fill={isStepActive ? "#E65A2B" : "#111827"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* 3 Milestone Cards with Giant Watermark Numbers (1, 2, 3) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {educationData.map((edu, idx) => {
              const node = desktopNodes[idx];
              const isHovered = hoveredIdx === idx;
              const isStepActive = isHovered || autoActiveStep >= idx;
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
                  {/* Giant Faint Background Number (1, 2, 3) with Scroll/Hover Highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.7, duration: 0.6 }}
                    className={`absolute -top-14 -right-2 text-[115px] font-black font-sans select-none pointer-events-none leading-none transition-all duration-500 ${
                      isStepActive
                        ? 'text-[#E65A2B]/28 scale-105'
                        : 'text-gray-200/70'
                    }`}
                  >
                    {stepNumber}
                  </motion.div>

                  {/* Milestone Card Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + idx * 0.7 }}
                    className={`relative z-10 pt-2 p-3 rounded-2xl transition-all duration-500 ${
                      isStepActive
                        ? 'bg-white/90 backdrop-blur-xs shadow-[0_8px_30px_rgba(230,90,43,0.08)] border border-[#E65A2B]/30 translate-y-[-4px]'
                        : 'bg-transparent border border-transparent'
                    }`}
                  >
                    {/* Period & Score Header Pills */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77756F] bg-gray-100/90 px-2.5 py-0.5 rounded-full border border-gray-200/80 shadow-xs">
                        {edu.period}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                        isStepActive
                          ? 'bg-[#E65A2B] text-white shadow-xs'
                          : 'bg-[#E65A2B]/10 text-[#E65A2B] border border-[#E65A2B]/20'
                      }`}>
                        {edu.gpa}
                      </span>
                    </div>

                    {/* Degree Title */}
                    <h3 className={`text-base font-extrabold font-sans leading-snug mb-1 transition-colors duration-300 ${
                      isStepActive ? 'text-[#E65A2B]' : 'text-[#111827]'
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
          <div className="relative pl-6 sm:pl-10 space-y-12">

            {/* Continuous Vertical Curved Path on Left */}
            <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#E65A2B] via-[#FF7A45] to-[#E65A2B]/30 shadow-[0_0_12px_rgba(230,90,43,0.4)]" />

            {educationData.map((edu, idx) => {
              const stepNumber = idx + 1;
              const isStepActive = autoActiveStep >= idx;

              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.4 }}
                  className={`relative group bg-white p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isStepActive
                      ? 'border-[#E65A2B]/50 shadow-[0_12px_32px_rgba(230,90,43,0.12)]'
                      : 'border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  {/* Glowing Node on the Vertical Line */}
                  <div className={`absolute -left-[30px] sm:-left-[46px] top-6 w-7 h-7 rounded-full bg-white border-2 transition-colors duration-300 flex items-center justify-center ${
                    isStepActive ? 'border-[#E65A2B] shadow-md' : 'border-gray-300'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                      isStepActive ? 'bg-[#E65A2B] scale-125' : 'bg-gray-400'
                    }`} />
                  </div>

                  {/* Giant Faint Number Background */}
                  <div className={`absolute right-4 top-2 text-7xl font-black font-sans pointer-events-none select-none transition-colors duration-300 ${
                    isStepActive ? 'text-[#E65A2B]/20' : 'text-gray-100/90'
                  }`}>
                    {stepNumber}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77756F] bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                        {edu.period}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                        isStepActive ? 'bg-[#E65A2B] text-white' : 'bg-[#E65A2B]/10 text-[#E65A2B] border border-[#E65A2B]/20'
                      }`}>
                        {edu.gpa}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-extrabold font-sans transition-colors mb-1 ${
                      isStepActive ? 'text-[#E65A2B]' : 'text-[#111827]'
                    }`}>
                      {edu.degree}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[#4B5563] mb-2">
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

      {/* ════════════════════════════════════════════════════════════════════════
          PART 2: GLOBAL FLUENCY & LANGUAGE PROFICIENCY SECTION
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="pt-12 border-t border-gray-200/80">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#E65A2B] inline-block" />
              <span>COMMUNICATION & FLUENCY</span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#111827] uppercase tracking-tight"
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

        {/* 3-Column Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languagesData.map((lang, idx) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -5 }}
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
