import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useReducedMotion } from 'framer-motion';
import Scene3D from './Scene3D';
import { personalInfo } from '../data/portfolio';

const useTypewriter = (words: string[], delay = 120, pause = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setText(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? delay / 2 : delay
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, delay, pause]);

  return text;
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const typewriterText = useTypewriter([
    'App Developer @ Lux Cozi',
    'Full Stack Developer',
    'React & TypeScript Pro',
    'ML & SAP Integrator',
    'Node.js REST API Architect',
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-dark-900 hero-gradient flex items-center pt-24 pb-12"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          id="hero-canvas"
          camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene3D mouseX={mouseX} mouseY={mouseY} />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark-900/90 via-dark-900/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />

      {/* Text & HUD Content Container */}
      <div className="relative z-20 section-container w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="tag font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                App Developer @ Lux Industries
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-4"
            >
              <span className="text-white">ANIMESH </span>
              <br />
              <span className="gradient-text text-glow">{personalInfo.lastName.toUpperCase()}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-slate-500 font-mono text-sm">[ ROLE ]</span>
              <span className="text-xl sm:text-2xl font-mono text-accent-cyan font-medium">
                {typewriterText}
              </span>
              <span className="w-0.5 h-6 bg-accent-cyan animate-pulse" />
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary font-mono text-xs"
                id="hero-projects-btn"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                VIEW PROJECTS [3]
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-outline font-mono text-xs"
                id="hero-contact-btn"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                CONTACT ME
              </button>
            </motion.div>
          </motion.div>

          {/* Futuristic Developer HUD Card (Inspired by saifullah.dev) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden backdrop-blur-xl">
              {/* Scanline decoration line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan to-transparent animate-pulse" />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                  <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">DEV_HUD // STATUS</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ONLINE
                </span>
              </div>

              {/* Metrics */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>CURRENT_EMPLOYER</span>
                    <span className="text-white font-semibold">LUX INDUSTRIES LTD</span>
                  </div>
                  <div className="w-full bg-dark-600 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-500 h-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>PRIMARY_STACK</span>
                    <span className="text-accent-cyan">REACT, TS, NODE, SAP</span>
                  </div>
                  <div className="w-full bg-dark-600 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent-cyan h-full w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>EXPERIENCE_YEARS</span>
                    <span className="text-accent-purple font-bold">2+ YEARS</span>
                  </div>
                  <div className="w-full bg-dark-600 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent-purple h-full w-[85%]" />
                  </div>
                </div>
              </div>

              {/* Terminal Log Output */}
              <div className="mt-5 p-3 rounded-xl bg-dark-900/80 border border-white/5 font-mono text-[11px] space-y-1 text-slate-400">
                <div className="text-accent-cyan">&gt; LOCATION: Kanchrapara, IN</div>
                <div className="text-emerald-400">&gt; EMAIL: animeshjis2020@gmail.com</div>
                <div className="text-slate-400">&gt; PHONE: +91 8910290421</div>
                <div className="text-slate-500">&gt; AVAILABILITY: OPEN FOR OFFERS</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-slate-500 tracking-widest uppercase font-mono">SCROLL_DOWN</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
