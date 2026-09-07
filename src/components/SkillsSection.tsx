import React from 'react';
import { motion } from 'framer-motion';
import { skillCategoriesData } from '../data/portfolio';

// Sparkle Icon for Gen AI skills
const SparklesIcon = () => (
  <svg className="w-4 h-4 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
  </svg>
);

// UI/UX & Design Tools Data (Inspired by uploaded editorial reference design)
const designToolsData = [
  {
    num: '01',
    name: 'FIGMA',
    category: 'UI/UX & INTERFACE PROTOTYPING',
    desc: 'Component systems, auto-layout, interactive micro-prototypes, and design tokens.',
    badge: 'PRIMARY TOOL',
    color: 'from-[#F24E1E]/20 via-[#A259FF]/20 to-[#0ACF83]/20',
    borderColor: 'group-hover:border-[#F24E1E]/60',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'PHOTOSHOP',
    category: 'VISUAL ASSETS & GRAPHIC COMPOSITING',
    desc: 'Asset optimization, photo manipulation, texture blending, and high-res imagery.',
    badge: 'GRAPHIC SUITE',
    color: 'from-[#31A8FF]/20 via-[#001E36]/40 to-[#001E36]/20',
    borderColor: 'group-hover:border-[#31A8FF]/60',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-[#001E36] border border-[#31A8FF] flex items-center justify-center text-[#31A8FF] font-black text-xs font-mono">
        Ps
      </div>
    ),
  },
  {
    num: '03',
    name: 'CANVA',
    category: 'MARKETING & BRAND CREATIVES',
    desc: 'Quick presentation decks, social media kits, banner systems, and brand assets.',
    badge: 'BRAND ASSETS',
    color: 'from-[#00C4CC]/20 via-[#7D2AE8]/20 to-[#00C4CC]/10',
    borderColor: 'group-hover:border-[#00C4CC]/60',
    icon: (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center text-white font-black text-xs italic font-serif">
        C
      </div>
    ),
  },
  {
    num: '04',
    name: 'FRAMER',
    category: 'INTERACTIVE ANIMATIONS & SITES',
    desc: 'Motion design, smooth micro-interactions, scroll triggers, and component publish.',
    badge: 'MOTION & WEB',
    color: 'from-[#0055FF]/20 via-[#0055FF]/10 to-transparent',
    borderColor: 'group-hover:border-[#0055FF]/60',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white font-mono font-bold text-xs">
        ▲
      </div>
    ),
  },
  {
    num: '05',
    name: 'WIX STUDIO',
    category: 'RAPID WEB PLATFORMS & CMS',
    desc: 'Responsive web layouts, client CMS architecture, rapid staging, and production sites.',
    badge: 'CMS PLATFORM',
    color: 'from-[#FA6B00]/20 via-[#FA6B00]/10 to-transparent',
    borderColor: 'group-hover:border-[#FA6B00]/60',
    icon: (
      <div className="w-8 h-8 rounded-lg bg-[#202022] border border-[#FA6B00]/40 flex items-center justify-center text-[#FA6B00] font-black text-xs font-mono">
        Wx
      </div>
    ),
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto select-none overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-[#202022]/10" />

      {/* Section Header */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E65A2B] inline-block animate-pulse" />
          <span>COMPETENCIES & SPECIALIZATIONS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 1.3, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
          className="text-4xl sm:text-6xl font-extrabold text-[#202022] uppercase tracking-tight leading-none"
        >
          SKILLS & EXPERTISE.
        </motion.h2>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          FEATURED GEN AI RECRUITER SPOTLIGHT BANNER (Eye-Catching UI)
         ════════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        style={{ willChange: 'transform' }}
        className="relative mb-16 p-1 rounded-3xl bg-gradient-to-r from-violet-600 via-amber-500 to-emerald-500 shadow-2xl overflow-hidden group"
      >
        <div className="relative p-8 sm:p-10 bg-[#161618] rounded-[22px] text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left: Title & Description */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg">
                <SparklesIcon />
                RECRUITER FEATURED
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono text-[11px] font-bold uppercase tracking-wider border border-white/15">
                HIGH DEMAND SKILL
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400">
              Generative AI & LLM Development
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Specialized in building next-generation AI-powered applications, integrating Large Language Models (LLMs), RAG (Retrieval-Augmented Generation) pipelines, and intelligent agentic workflows.
            </p>
          </div>

          {/* Right: Key AI Tech Badges */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 min-w-[240px]">
            {[
              '✨ Generative AI Development',
              '⚡ LLM & OpenAI API Integration',
              '🧠 LangChain & RAG Architecture',
              '🤖 AI Agent Workflows & Fine-Tuning',
              '🚀 ML Model Deployment & SAP Integration',
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-400/50 transition-all font-mono text-xs font-bold text-amber-200"
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Subtle Ambient Background Glow inside card */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════════
          PRIMARY SKILL CATEGORIES GRID (Gen AI, Core Engineering, Backend)
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {skillCategoriesData.map((cat, idx) => {
          const isGenAI = cat.category.includes('Gen AI');

          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.13, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
              className={`flex flex-col p-7 rounded-2xl border transition-all duration-300 ${
                isGenAI
                  ? 'bg-gradient-to-b from-[#1c1c1e] to-[#202022] border-amber-500/40 text-white shadow-xl hover:border-amber-400'
                  : 'bg-[#FBFBFA] border-[#202022]/10 hover:border-[#202022] hover:bg-white hover:shadow-xl text-[#202022]'
              }`}
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between pb-4 border-b border-current/15 mb-6">
                <h3
                  className={`text-base sm:text-lg font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isGenAI ? 'text-amber-400' : 'text-[#202022]'
                  }`}
                >
                  {isGenAI && <SparklesIcon />}
                  <span>[{String(idx + 1).padStart(2, '0')}] {cat.category}</span>
                </h3>
                {isGenAI && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500 text-black rounded uppercase">
                    HOT
                  </span>
                )}
              </div>

              {/* Skills List */}
              <ul className="space-y-3 font-mono text-xs sm:text-sm">
                {cat.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ x: 4 }}
                    style={{ willChange: 'transform' }}
                    className={`flex items-center gap-3 py-2 px-3.5 rounded-xl border transition-all ${
                      isGenAI
                        ? 'bg-white/5 border-white/10 hover:border-amber-400/60 hover:bg-white/10 text-gray-100'
                        : 'bg-white border-[#202022]/10 hover:border-[#E65A2B]/40 text-[#202022]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isGenAI ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-[#202022]'
                      }`}
                    />
                    <span className="font-medium">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          NEW SECTION: UI/UX & DESIGN TOOLS (Inspired by uploaded editorial reference)
          Featuring Figma, Photoshop, Canva, Framer, Wix Studio
         ════════════════════════════════════════════════════════════════════════ */}
      <div className="pt-12 border-t border-[#202022]/10">
        
        {/* Subsection Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E65A2B] inline-block" />
              <span>EDITORIAL DESIGN SYSTEMS ↘</span>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, scale: 1.25, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
              className="text-3xl sm:text-5xl font-extrabold text-[#202022] uppercase tracking-tight"
            >
              UI/UX & DESIGN TOOLS.
            </motion.h3>
          </div>

          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-xs font-mono text-[#77756F] uppercase tracking-wider max-w-xs"
          >
            HIGH-FIDELITY PROTOTYPING, GRAPHIC SUITE & WEB PLATFORMS
          </motion.span>
        </div>

        {/* 5-Card Editorial Grid (Matching Marina Voss reference layout style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designToolsData.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 45, rotateX: 8, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              className={`group relative p-7 rounded-2xl bg-[#1B1617] text-white border border-white/10 ${tool.borderColor} hover:-translate-y-2 transition-[border-color,transform,box-shadow] duration-300 ease-out shadow-xl overflow-hidden flex flex-col justify-between min-h-[260px]`}
            >
              {/* Subtle Gradient Background Effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                {/* Top line: Number Tag + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-[#E27D60] tracking-tighter">
                    {tool.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white/80 font-mono text-[10px] font-bold uppercase tracking-wider border border-white/15">
                    {tool.badge}
                  </span>
                </div>

                {/* Tool Icon + Name */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight uppercase text-white group-hover:text-[#E27D60] transition-colors duration-300">
                      {tool.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#E27D60] uppercase tracking-wider">
                      {tool.category}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                  {tool.desc}
                </p>
              </div>

              {/* Bottom Footer: Arrow link effect */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                <span>UI/UX WORKFLOW</span>
                <span className="text-base text-[#E27D60] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  ↘
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
