import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVGDisplacementMask from './SVGDisplacementMask';

interface CursorRevealWindowProps {
  activeArtworkUrl: string | null;
}

export const CursorRevealWindow: React.FC<CursorRevealWindowProps> = ({ activeArtworkUrl }) => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Refs for direct DOM writes — no setState per frame
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const viewfinderRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: -300, y: -300 });
  const currentRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const fineQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (fineQuery.matches && !reducedMotionQuery.matches) {
      setIsPointerFine(true);
    }
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const hovered = !!(target && target.closest('a, button, article, [data-cursor]'));
      setIsHovered(hovered);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isPointerFine]);

  // RAF loop — writes directly to DOM, zero React re-renders
  useEffect(() => {
    if (!isPointerFine) return;

    const loop = () => {
      const t = targetRef.current;
      const c = currentRef.current;

      // Higher lerp factor = smoother & faster follow
      const factor = 0.18;
      const nx = c.x + (t.x - c.x) * factor;
      const ny = c.y + (t.y - c.y) * factor;
      currentRef.current = { x: nx, y: ny };

      // Update mask position
      if (maskLayerRef.current) {
        const mask = `radial-gradient(circle 145px at ${nx}px ${ny}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)`;
        maskLayerRef.current.style.webkitMaskImage = mask;
        maskLayerRef.current.style.maskImage = mask;
      }

      // Update viewfinder ring position
      if (viewfinderRef.current) {
        viewfinderRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      <SVGDisplacementMask />

      {/* Aurora keyframe animations injected once */}
      <style>{`
        @keyframes viewfinder-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>

      {/* Fullscreen Hidden Visual Layer */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden select-none">

        {/* Mask layer — position updated directly via ref in RAF loop */}
        <div
          ref={maskLayerRef}
          className="absolute inset-0"
          style={{
            // Initial off-screen mask so nothing shows before first mousemove
            WebkitMaskImage: 'radial-gradient(circle 145px at -300px -300px, rgba(0,0,0,1) 0%, transparent 100%)',
            maskImage: 'radial-gradient(circle 145px at -300px -300px, rgba(0,0,0,1) 0%, transparent 100%)',
            filter: 'url(#smoky-mask-filter)',
          }}
        >
          <AnimatePresence mode="wait">
            {activeArtworkUrl ? (
              /* Project artwork revealed on hover */
              <motion.div
                key={activeArtworkUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.92 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <img
                  src={activeArtworkUrl}
                  alt="Project artwork"
                  className="w-full h-full object-cover contrast-[1.1] brightness-[0.95]"
                />
              </motion.div>
            ) : (
              /* Idle state — reveal background image */
              <motion.div
                key="reveal-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img
                  src="https://res.cloudinary.com/deitdqyiw/image/upload/v1788777280/9b730a8c274b6029b958c2f25ab2182a_ydgulg.jpg"
                  alt="Reveal background"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Viewfinder ring — also moved via ref, zero re-renders */}
        <div
          ref={viewfinderRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{ transform: 'translate3d(-300px,-300px,0)' }}
        >
          <div
            className="relative w-28 h-28 rounded-full border border-white/40 flex items-center justify-center shadow-xl"
            style={{
              transform: 'translate(-50%, -50%)',
              animation: 'viewfinder-breathe 4s ease-in-out infinite',
            }}
          >
            {/* Center dot */}
            <div className="w-1 h-1 rounded-full bg-white/80" />

            {/* HI / LD labels */}
            <div className="absolute inset-0 flex items-center justify-between px-2 font-mono text-[9px] tracking-widest text-white/90 select-none">
              <span style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s' }}>HI</span>
              <span style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s' }}>LD</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CursorRevealWindow;
