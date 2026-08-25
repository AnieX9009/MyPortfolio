import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShowreelSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <section id="showreel" className="w-full py-8 sm:py-12 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-center">
        <div
          id="showreel-video-container"
          className="relative w-full aspect-video sm:aspect-[21/9] bg-[#202022] overflow-hidden group shadow-2xl rounded-2xl"
          data-cursor="Play"
        >
          {/* Looping muted video preview */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-700"
          >
            <source src="https://res.cloudinary.com/deitdqyiw/video/upload/v1787568470/From_Klickpin.com-_24_Classy_easy_dinner_recipe_ideas_that_instantly_upgrade_your_space_style_or_celebration_without_much_effort_for_creators_who_k02ptp.mp4" type="video/mp4" />
          </video>

          {/* Showreel Label */}
          <div className="absolute top-6 left-6 font-mono text-xs uppercase tracking-widest text-[#F3F1EA] z-10">
            SHOWREEL [2026]
          </div>

          {/* Play Showreel Button with Magnetic Effect */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Play showreel"
              data-cursor="Play"
              data-magnetic
              className="px-8 py-4 bg-[#F3F1EA] text-[#202022] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FFFFFF] transition-colors duration-300 shadow-2xl rounded-lg"
            >
              Play showreel ▶
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Expansion Modal Scene */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[2000] bg-[#202022] flex flex-col items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Immersive Showreel Player"
          >
            <div className="absolute top-6 right-6 z-30">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Exit scene"
                data-cursor="Close"
                data-magnetic
                className="px-6 py-3 bg-[#F3F1EA] text-[#202022] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FFFFFF] transition-colors rounded-lg"
              >
                Exit scene ✕ (ESC)
              </button>
            </div>

            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl rounded-xl overflow-hidden">
              <video
                src="https://res.cloudinary.com/deitdqyiw/video/upload/v1787568470/From_Klickpin.com-_24_Classy_easy_dinner_recipe_ideas_that_instantly_upgrade_your_space_style_or_celebration_without_much_effort_for_creators_who_k02ptp.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShowreelSection;
