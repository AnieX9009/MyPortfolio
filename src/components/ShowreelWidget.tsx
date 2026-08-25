import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShowreelWidget: React.FC = () => {
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
      {/* Fixed Bottom-Right Showreel Widget (Exact Match to Screenshots 1, 2, 3, 4, 5) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Play showreel"
          data-cursor="Play"
          data-magnetic
          className="relative w-36 sm:w-44 h-20 sm:h-24 rounded-2xl overflow-hidden shadow-2xl group border border-[#202022]/10 transition-transform duration-300 hover:scale-[1.04] focus:outline-none"
        >
          {/* Looping video thumbnail */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          >
            <source src="https://res.cloudinary.com/deitdqyiw/video/upload/v1787569244/From_Klickpin.com-_Save_Fresh_meal_prep_recipes_that_feel_fresh_practical_and_surprisingly_easy_to_try_for_ideas_worth_saving_right_now-pin-id-104_mlo3ui.mp4" type="video/mp4" />
          </video>

          {/* Central Play Icon Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-3 text-center">
            <div className="w-7 h-7 rounded-full bg-[#F3F1EA]/90 text-[#202022] flex items-center justify-center text-[10px] pl-0.5 mb-1 group-hover:bg-white transition-colors">
              ▶
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold">
              SHOWREEL
            </span>
          </div>
        </button>
      </div>

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
                className="px-6 py-3 bg-[#F3F1EA] text-[#202022] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FFFFFF] transition-colors"
              >
                Exit scene ✕ (ESC)
              </button>
            </div>

            <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl rounded-2xl overflow-hidden">
              <video
                src="https://res.cloudinary.com/deitdqyiw/video/upload/v1787569244/From_Klickpin.com-_Save_Fresh_meal_prep_recipes_that_feel_fresh_practical_and_surprisingly_easy_to_try_for_ideas_worth_saving_right_now-pin-id-104_mlo3ui.mp4"
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

export default ShowreelWidget;
