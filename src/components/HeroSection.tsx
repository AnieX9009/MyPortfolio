import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { HeroBadge3D } from './HeroBadge3D';

export const HeroSection: React.FC = () => {
  // Split name into two lines: first word + rest
  const nameParts = personalInfo.name.toUpperCase().split(' ');
  const firstLine = nameParts[0];
  const secondLine = nameParts.slice(1).join(' ');

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto select-none overflow-x-hidden"
    >
      {/* Main row: Name column + Badge column */}
      <div className="flex items-start justify-between w-full">
        {/* ── Left: Giant Name + Sub-badges ── */}
        <div className="flex flex-col">
          {/* ANIMESH */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-[clamp(4rem,11vw,11rem)] font-extrabold tracking-tighter text-[#202022] leading-none uppercase"
            >
              {firstLine}
            </motion.div>
          </div>

          {/* MONDAL */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="text-[clamp(4rem,11vw,11rem)] font-extrabold tracking-tighter text-[#202022] leading-none uppercase"
            >
              {secondLine}
            </motion.div>
          </div>

          {/* Sub-header badges — tight below MONDAL */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#202022]"
          >
            <span className="px-2.5 py-1 bg-[#202022] text-[#F3F1EA] font-bold rounded-md uppercase">
              FULL STACK DEVELOPER
            </span>
            <span className="opacity-40">//</span>
            <span>LUX INDUSTRIES</span>
            <span className="opacity-40">//</span>
            <span>KOLKATA, INDIA</span>
          </motion.div>
        </div>

        {/* ── Right: 3D Lanyard Badge (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-start pl-12 pt-2"
          style={{ marginTop: '-20px' }}
        >
          <HeroBadge3D
            photoUrl={personalInfo.photoUrl || '/badge_avatar.jpg'}
            name={personalInfo.name}
            role="APP DEVELOPER"
            company="LUX INDUSTRIES LTD."
          />
        </motion.div>
      </div>

      {/* ── Bottom: Supporting copy + scroll cue ── */}
      <div className="mt-8 pb-2">
        <div id="hero-subtext" className="grid md:grid-cols-12 gap-6 items-end w-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 lg:col-span-7"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#202022] leading-snug">
              {personalInfo.supportingStatement}
            </p>
          </motion.div>

          {/* Scroll Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="md:col-span-4 lg:col-span-5 flex justify-start md:justify-end"
          >
            <div
              data-magnetic
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#77756F] cursor-pointer"
            >
              <span>SCROLL TO EXPLORE</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="text-[#202022]"
              >
                ↓
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
