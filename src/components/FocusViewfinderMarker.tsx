import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FocusViewfinderMarkerProps {
  mouseX: number;
  mouseY: number;
}

export const FocusViewfinderMarker: React.FC<FocusViewfinderMarkerProps> = ({ mouseX, mouseY }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile) return null;

  // Convert normalized mouse coordinates [-1, 1] to screen pixel position
  const x = ((mouseX + 1) / 2) * (typeof window !== 'undefined' ? window.innerWidth : 1200);
  const y = ((-mouseY + 1) / 2) * (typeof window !== 'undefined' ? window.innerHeight : 800);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      {/* Outer Viewfinder Ring (Exact match to screenshot 1, 2, 4, 5) */}
      <div className="w-24 h-24 rounded-full border border-[#202022]/30 flex items-center justify-center relative backdrop-blur-[2px]">
        
        {/* Inner Crosshair Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#202022]/70" />

        {/* Focus Ring Label (H O L D) */}
        <div className="absolute inset-0 flex items-center justify-between px-2 font-mono text-[8px] tracking-[0.25em] text-[#202022]/60 select-none">
          <span>H</span>
          <span>D</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FocusViewfinderMarker;
