import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12 + 5);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[100] bg-[#050508] text-white flex flex-col justify-between p-8 font-mono select-none"
      >
        {/* Top Header */}
        <div className="flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>ANIMESH MONDAL // PORTFOLIO 2026</span>
          </div>
          <span>[ WEBGL 3D ENGINE ]</span>
        </div>

        {/* Center Progress / Click to Enter */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-7xl sm:text-9xl font-black gradient-text tracking-tighter mb-4">
            {Math.min(progress, 100)}%
          </div>

          <div className="w-64 h-1 bg-dark-600 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-purple"
              style={{ width: `${progress}%` }}
            />
          </div>

          {isLoaded ? (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="btn-primary font-mono text-xs py-3.5 px-8 shadow-2xl shadow-primary-500/50"
            >
              CLICK TO ENTER PORTFOLIO ↵
            </motion.button>
          ) : (
            <span className="text-xs text-slate-400 tracking-widest animate-pulse">
              INITIALIZING 3D GRAPHICS PIPELINE...
            </span>
          )}
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[10px] text-slate-600">
          <span>REACT THREE FIBER + GSAP</span>
          <span>KANCHRAPARA, INDIA</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
