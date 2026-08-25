import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── inline SVG illustrations (sketch/line-art style) ─── */

const CodeIllustration = () => (
  <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Monitor */}
    <rect x="30" y="50" width="200" height="130" rx="10" stroke="#202022" strokeWidth="3" fill="none"/>
    <rect x="40" y="60" width="180" height="110" rx="6" fill="#202022" opacity="0.06"/>
    {/* Screen content - code lines */}
    <line x1="55" y1="82" x2="105" y2="82" stroke="#202022" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="55" y1="96" x2="145" y2="96" stroke="#202022" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="70" y1="110" x2="125" y2="110" stroke="#202022" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <line x1="70" y1="124" x2="155" y2="124" stroke="#202022" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <line x1="55" y1="138" x2="110" y2="138" stroke="#202022" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="55" y1="152" x2="135" y2="152" stroke="#202022" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    {/* cursor blink */}
    <rect x="138" y="147" width="8" height="10" rx="1" fill="#202022" opacity="0.7"/>
    {/* Stand */}
    <line x1="130" y1="180" x2="130" y2="205" stroke="#202022" strokeWidth="3" strokeLinecap="round"/>
    <line x1="100" y1="205" x2="160" y2="205" stroke="#202022" strokeWidth="3" strokeLinecap="round"/>
    {/* Coffee mug */}
    <rect x="195" y="185" width="28" height="22" rx="4" stroke="#202022" strokeWidth="2.5" fill="none"/>
    <path d="M223 193 Q232 193 232 200 Q232 207 223 207" stroke="#202022" strokeWidth="2" fill="none"/>
    <line x1="198" y1="191" x2="221" y2="191" stroke="#202022" strokeWidth="1.5" opacity="0.4"/>
    {/* Steam */}
    <path d="M203 182 Q205 177 203 172" stroke="#202022" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M210 182 Q212 175 210 170" stroke="#202022" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    {/* Mobile phone */}
    <rect x="38" y="185" width="22" height="36" rx="4" stroke="#202022" strokeWidth="2.5" fill="none"/>
    <rect x="43" y="190" width="12" height="22" rx="2" fill="#202022" opacity="0.08"/>
    <circle cx="49" cy="216" r="2" fill="#202022" opacity="0.5"/>
    {/* Scattered code brackets */}
    <text x="168" y="100" fontSize="22" fill="#202022" opacity="0.12" fontFamily="monospace" fontWeight="bold">{"{ }"}</text>
    <text x="40" y="220" fontSize="14" fill="#202022" opacity="0.1" fontFamily="monospace">{"</>"}</text>
    {/* Grid dots accent */}
    {[0,1,2,3,4].map(col => [0,1,2,3].map(row => (
      <circle key={`${col}-${row}`} cx={165 + col*14} cy={65 + row*14} r="1.2" fill="#202022" opacity="0.12"/>
    )))}
  </svg>
);

const ToolsIllustration = () => (
  <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Laptop */}
    <rect x="40" y="40" width="180" height="120" rx="8" stroke="#202022" strokeWidth="3" fill="none"/>
    <rect x="50" y="50" width="160" height="100" rx="4" fill="#202022" opacity="0.05"/>
    {/* React logo sketch */}
    <ellipse cx="130" cy="100" rx="30" ry="12" stroke="#202022" strokeWidth="2" fill="none"/>
    <ellipse cx="130" cy="100" rx="30" ry="12" stroke="#202022" strokeWidth="2" fill="none" transform="rotate(60 130 100)"/>
    <ellipse cx="130" cy="100" rx="30" ry="12" stroke="#202022" strokeWidth="2" fill="none" transform="rotate(120 130 100)"/>
    <circle cx="130" cy="100" r="5" fill="#202022" opacity="0.7"/>
    {/* Keyboard base */}
    <rect x="30" y="160" width="200" height="10" rx="5" stroke="#202022" strokeWidth="2.5" fill="none"/>
    {/* Keys */}
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <rect key={i} x={40 + i * 20} y="163" width="14" height="4" rx="1.5" fill="#202022" opacity="0.2"/>
    ))}
    {/* Tech stack badges */}
    <rect x="32" y="30" width="32" height="14" rx="7" fill="#202022" opacity="0.08" stroke="#202022" strokeWidth="1.2"/>
    <text x="36" y="41" fontSize="7" fill="#202022" fontFamily="monospace" opacity="0.6">React</text>
    <rect x="72" y="22" width="36" height="14" rx="7" fill="#202022" opacity="0.08" stroke="#202022" strokeWidth="1.2"/>
    <text x="76" y="33" fontSize="7" fill="#202022" fontFamily="monospace" opacity="0.6">Node.js</text>
    <rect x="118" y="16" width="38" height="14" rx="7" fill="#202022" opacity="0.08" stroke="#202022" strokeWidth="1.2"/>
    <text x="122" y="27" fontSize="7" fill="#202022" fontFamily="monospace" opacity="0.6">TypeScript</text>
    <rect x="170" y="22" width="40" height="14" rx="7" fill="#202022" opacity="0.08" stroke="#202022" strokeWidth="1.2"/>
    <text x="174" y="33" fontSize="7" fill="#202022" fontFamily="monospace" opacity="0.6">React Native</text>
    {/* Grid dots */}
    {[0,1,2,3].map(col => [0,1,2].map(row => (
      <circle key={`${col}-${row}`} cx={200 + col*12} cy={140 + row*12} r="1.2" fill="#202022" opacity="0.15"/>
    )))}
  </svg>
);

/* ─── main About section ─── */

export const AboutSection: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const art1Ref      = useRef<HTMLDivElement>(null);
  const art2Ref      = useRef<HTMLDivElement>(null);

  /* GSAP reveal animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading letter stagger
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          duration: 1.0,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }
      // Art panels float in
      [art1Ref, art2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.from(ref.current, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Scroll-linked parallax for art panels */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const art1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const art2Y = useTransform(scrollYProgress, [0, 1], [60, -20]);
  const art1Rot = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const art2Rot = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const springArt1Y = useSpring(art1Y, { stiffness: 80, damping: 25 });
  const springArt2Y = useSpring(art2Y, { stiffness: 60, damping: 22 });

  const heading = 'ABOUT';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* ── Background grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(32,32,34,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(32,32,34,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Section label ── */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-xs font-mono uppercase tracking-widest text-[#77756F] block mb-6"
      >
        BIOGRAPHY // ABOUT
      </motion.span>

      {/* ── Big ABOUT heading ── */}
      <div ref={headingRef} className="overflow-hidden mb-16">
        <h2 className="text-[clamp(4rem,12vw,11rem)] font-extrabold tracking-tighter text-[#202022] leading-none uppercase flex">
          {heading.split('').map((ch, i) => (
            <span key={i} className="char inline-block">{ch}</span>
          ))}
        </h2>
      </div>

      {/* ══════════════════════════════════════════
          ROW 1 — Hello intro + Code illustration
         ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">

        {/* Left — Illustration panel */}
        <motion.div
          ref={art1Ref}
          style={{ y: springArt1Y, rotate: art1Rot }}
          className="order-2 md:order-1"
        >
          <div
            className="relative mx-auto"
            style={{ maxWidth: 320 }}
          >
            {/* Bordered art frame */}
            <div
              className="relative p-6 rounded-2xl"
              style={{
                background: 'rgba(32,32,34,0.03)',
                border: '1.5px solid rgba(32,32,34,0.10)',
                boxShadow: '8px 8px 0 rgba(32,32,34,0.06)',
              }}
            >
              {/* Corner year tag */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#77756F] uppercase tracking-widest">
                2025
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#77756F] uppercase tracking-widest">
                Animesh Mondal
              </div>
              <div className="pt-4">
                <CodeIllustration />
              </div>
              {/* Bottom label */}
              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#202022] opacity-40">
                  Full Stack • App Developer
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Hello intro text */}
        <div className="order-1 md:order-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl sm:text-3xl font-light text-[#77756F] leading-tight">Hello,</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#202022] leading-tight mt-1">
              I'm <span className="italic">Animesh Mondal</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base sm:text-lg font-semibold text-[#202022] tracking-wide"
          >
            Full Stack Developer&nbsp;•&nbsp;App Developer&nbsp;•&nbsp;ML Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-[#4a4a4d] leading-relaxed"
          >
            My journey started at <strong className="text-[#202022]">Guru Nanak Institute of Technology</strong>, where I graduated with a B.Tech in Computer Science & Engineering (GPA 8.5). I build high-performance applications blending enterprise engineering with creative technology.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base text-[#4a4a4d] leading-relaxed"
          >
            Currently at <strong className="text-[#202022]">Lux Industries Limited (Lux Cozi)</strong>, I engineer Master Data Management dashboards with SAP integration, deploy predictive ML models, and track real-time app analytics to continuously improve user retention.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ROW 2 — Tools fluent in + second illustration
         ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left — Tools fluent in */}
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl font-extrabold text-[#202022]"
          >
            Tech I'm fluent in
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base text-[#4a4a4d] leading-relaxed"
          >
            <strong className="text-[#202022]">React, Node.js, TypeScript, React Native</strong>, and <strong className="text-[#202022]">MongoDB</strong> — across web and mobile development, REST API design, Redux state management, and Firebase integrations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-[#4a4a4d] leading-relaxed"
          >
            Before Lux Industries I spent a year at <strong className="text-[#202022]">ASR Tech Solutions</strong>, building production REST APIs in Express, managing complex state with Redux & TypeScript, and running agile sprints — shipping real products for real users.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-[#77756F] pt-4 border-t border-[#202022]/10 leading-relaxed"
          >
            These days I split time between enterprise software and creative experiments — shaders, generative art, and real-time 3D with <strong className="text-[#202022]">Three.js, React Three Fiber & GSAP</strong>. If you have something great to build — I'd love to hear from you.
          </motion.p>
        </div>

        {/* Right — Tools illustration panel */}
        <motion.div
          ref={art2Ref}
          style={{ y: springArt2Y, rotate: art2Rot }}
        >
          <div
            className="relative mx-auto"
            style={{ maxWidth: 340 }}
          >
            <div
              className="relative p-6 rounded-2xl"
              style={{
                background: 'rgba(32,32,34,0.03)',
                border: '1.5px solid rgba(32,32,34,0.10)',
                boxShadow: '-8px 8px 0 rgba(32,32,34,0.06)',
              }}
            >
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#77756F] uppercase tracking-widest">
                Stack
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#77756F] uppercase tracking-widest">
                Kolkata, India
              </div>
              <div className="pt-4">
                <ToolsIllustration />
              </div>
              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#202022] opacity-40">
                  Web • Mobile • Backend • ML
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
