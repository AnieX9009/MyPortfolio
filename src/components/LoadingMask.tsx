import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingMaskProps {
  onComplete: () => void;
}

export const LoadingMask: React.FC<LoadingMaskProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Increment progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(handleDismiss, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 8);
      });
    }, 70);

    // Safety timeout fallback (3 seconds max)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(handleDismiss, 300);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[1000] bg-[#F3F1EA] text-[#202022] flex flex-col justify-between p-8 sm:p-12 font-sans select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Loading screen"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-xs font-mono text-[#77756F]">
            <span>ANIMESH MONDAL</span>
            <span>PORTFOLIO 2026</span>
          </div>

          {/* Center Numeric Progress Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl sm:text-9xl font-extrabold tracking-tighter"
            >
              {Math.min(progress, 100)}%
            </motion.h1>
            <span className="text-xs font-mono text-[#77756F] uppercase tracking-widest mt-4">
              CRAFTING IMMERSIVE EXPERIENCES
            </span>
          </div>

          {/* Footer Bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#77756F]">
            <div className="w-full sm:w-64 h-1 bg-[#202022]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#202022]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>INITIALIZING WEBGL SCENE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingMask;
