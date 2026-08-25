import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGDisplacementMask from './SVGDisplacementMask';

interface CursorRevealWindowProps {
  activeArtworkUrl: string | null;
}

export const CursorRevealWindow: React.FC<CursorRevealWindowProps> = ({ activeArtworkUrl }) => {
  const [targetPos, setTargetPos] = useState({ x: -300, y: -300 });
  const [currentPos, setCurrentPos] = useState({ x: -300, y: -300 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const reqRef = useRef<number | null>(null);

  // Check pointer fine & prefers-reduced-motion
  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (fineQuery.matches && !reducedMotionQuery.matches) {
      setIsPointerFine(true);
    }
  }, []);

  // Track mouse coordinates
  useEffect(() => {
    if (!isPointerFine) return;

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-[#reveal-active]], [data-cursor], a, button, article')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isPointerFine]);

  // Smooth lerp follow loop (damping = 0.09) using requestAnimationFrame
  useEffect(() => {
    if (!isPointerFine) return;

    const animateLerp = () => {
      setCurrentPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.09,
          y: prev.y + dy * 0.09,
        };
      });
      reqRef.current = requestAnimationFrame(animateLerp);
    };

    reqRef.current = requestAnimationFrame(animateLerp);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [targetPos, isPointerFine]);

  if (!isPointerFine) return null;

  // Fallback artwork if no project is actively hovered
  const displayArtwork = activeArtworkUrl || 'https://media.mathis-biabiany.fr/Txd5RqLE_BYq_5iA_West_Lafayette_01.webp';

  return (
    <>
      <SVGDisplacementMask />

      {/* Fullscreen Hidden Visual Layer Behind Page Text (z-5) */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden select-none">
        
        {/* Soft Radial Gradient Feathered Mask Container */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            WebkitMaskImage: `radial-gradient(circle 140px at ${currentPos.x}px ${currentPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)`,
            maskImage: `radial-gradient(circle 140px at ${currentPos.x}px ${currentPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)`,
            filter: 'url(#smoky-mask-filter)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={displayArtwork}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <img
                src={displayArtwork}
                alt="Hidden Layer Reveal"
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Viewfinder Lens Overlay (1px light ring with 'HI' / 'LD' labels at current mouse position) */}
        <div
          className="absolute top-0 left-0 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`,
          }}
        >
          {/* Inner 1px Light Ring with Slow Breathing Idle Scale */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 flex items-center justify-center shadow-xl"
          >
            {/* Center Dot */}
            <div className="w-1 h-1 rounded-full bg-white/80" />

            {/* Tiny Monospace Labels ('HI' / 'LD') fading in on hover */}
            <div className="absolute inset-0 flex items-center justify-between px-2 font-mono text-[9px] tracking-widest text-white/90 select-none">
              <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>HI</span>
              <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>LD</span>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default CursorRevealWindow;
