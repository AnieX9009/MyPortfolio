import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { projectsData } from '../data/portfolio';

interface Project3DLaptopShowcaseProps {
  onHoverArtwork?: (url: string | null) => void;
}

const displayProjects = [
  { ...projectsData[0], tag: 'React Native', author: 'Animesh Mondal' },
  { ...(projectsData[1] || projectsData[0]), tag: 'Frontend Web', author: 'Animesh Mondal' },
  { ...(projectsData[2] || projectsData[0]), tag: 'Full-Stack Firebase', author: 'Animesh Mondal' },
  { ...projectsData[0], tag: 'Gen AI & ML', author: 'Animesh Mondal' },
  { ...(projectsData[1] || projectsData[0]), tag: 'WebGL & 3D', author: 'Animesh Mondal' },
];

const FannedCard: React.FC<{
  proj: typeof displayProjects[0];
  index: number;
  progress: MotionValue<number>;
  onHoverArtwork?: (url: string | null) => void;
}> = ({ proj, index, progress, onHoverArtwork }) => {
  // Continuous offset calculation: (index - progress)
  const offset = useTransform(progress, (p) => index - p);

  // Derive continuous 3D transforms seamlessly
  const x = useTransform(offset, (o) => o * 115);
  const rotateY = useTransform(offset, (o) => o * -16);
  const rotateZ = useTransform(offset, (o) => o * 2.2);
  const z = useTransform(offset, (o) => Math.max(-120, 95 - Math.abs(o) * 45));
  const scale = useTransform(offset, (o) => Math.max(0.82, 1.08 - Math.abs(o) * 0.1));
  const opacity = useTransform(offset, (o) => Math.max(0.35, 1 - Math.abs(o) * 0.3));
  const zIndex = useTransform(offset, (o) => Math.round(20 - Math.abs(o)));

  return (
    <motion.div
      style={{
        x,
        rotateY,
        rotateZ,
        z,
        scale,
        opacity,
        zIndex,
        transformStyle: 'preserve-3d',
        position: 'absolute',
      }}
      onMouseEnter={() => onHoverArtwork?.(proj.mediaUrl)}
      onMouseLeave={() => onHoverArtwork?.(null)}
      className="cursor-pointer w-44 sm:w-56 p-3.5 sm:p-4 rounded-2xl border transition-shadow duration-300 bg-[#1B1617] text-white border-[#E65A2B] shadow-[0_25px_60px_rgba(0,0,0,0.3)] ring-1 ring-[#E65A2B]/40"
    >
      {/* Card Thumbnail Image */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-[#202022]/20">
        <img
          src={proj.mediaUrl}
          alt={proj.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#202022]/85 backdrop-blur-md text-[9px] font-mono font-bold text-[#F3F1EA]">
          {proj.tag}
        </div>
      </div>

      {/* Card Info */}
      <div className="text-center">
        <div className="text-xs sm:text-sm font-extrabold truncate">
          {proj.title}
        </div>
        <div className="text-[10px] font-mono mt-0.5 text-gray-300 truncate">
          {proj.author}
        </div>

        <button className="mt-2.5 w-full py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E65A2B] text-white shadow-md hover:bg-[#d84e20] transition-colors">
          GET STARTED ▶
        </button>
      </div>
    </motion.div>
  );
};

export const Project3DLaptopShowcase: React.FC<Project3DLaptopShowcaseProps> = ({ onHoverArtwork }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Device tilt spring physics
  const springX = useSpring(0, { stiffness: 50, damping: 22 });
  const springY = useSpring(0, { stiffness: 50, damping: 22 });

  // Ultra-smooth continuous card carousel progress (0.0 to 4.0)
  const carouselProgressRaw = useSpring(2, { stiffness: 45, damping: 20, mass: 0.6 });

  const rotateY = useTransform(springX, [-600, 600], [-10, 10]);
  const rotateX = useTransform(springY, [-600, 600], [6, -6]);

  // Continuous mouse tracking for 60fps fluid card sliding
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width; // 0 to 1
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      springX.set(e.clientX - cx);
      springY.set(e.clientY - cy);

      // Smoothly map mouse position (0 -> 1) to continuous carousel index (0.0 -> 4.0)
      if (relativeX >= -0.1 && relativeX <= 1.1) {
        const continuousIndex = Math.min(4, Math.max(0, relativeX * 4));
        carouselProgressRaw.set(continuousIndex);
      }
    };

    const node = containerRef.current;
    if (node) node.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (node) node.removeEventListener('mousemove', handleMouseMove);
    };
  }, [springX, springY, carouselProgressRaw]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto my-4 select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── SITS DIRECTLY ON WEBSITE CANVAS — NO CONTAINER BOX ── */}
      <div className="relative min-h-[520px] sm:min-h-[580px] w-full flex flex-col justify-between p-2 sm:p-6">
        
        {/* ── TOP NAV PILL TAGS ── */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#202022]">
            {['React Native', 'Full-Stack', 'Gen AI', 'WebGL 3D'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full bg-white/90 shadow-sm border border-[#202022]/10 hover:border-[#202022] transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#202022] text-[#F3F1EA] text-[11px] font-mono font-bold tracking-wider shadow-sm">
            @animesh.dev
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            CAMERA VIEWFINDER FRAME (Directly on website canvas — NO background box)
           ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative z-20 my-auto py-6 px-4 sm:px-8 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
        >
          {/* CAMERA VIEWFINDER BRACKET CORNERS (┌ ┐) */}
          <div className="absolute -top-1 -left-1 w-7 h-7 border-t-2 border-l-2 border-[#202022] rounded-tl-sm pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-7 h-7 border-t-2 border-r-2 border-[#202022] rounded-tr-sm pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-2 border-l-2 border-[#202022] rounded-bl-sm pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-2 border-r-2 border-[#202022] rounded-br-sm pointer-events-none" />

          {/* Viewfinder Header Title */}
          <div className="text-center max-w-lg mb-8">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#202022] tracking-tight uppercase leading-tight mb-2">
              Best Craft For Your Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#77756F] font-sans leading-relaxed">
              Move your mouse left & right to glide smoothly through featured 3D projects.
            </p>
          </div>

          {/* ════════════════════════════════════════════════════════════════════════
              5 FANNED 3D PERSPECTIVE CARDS (Continuous 60fps Motion Value Sliding)
             ════════════════════════════════════════════════════════════════════════ */}
          <div
            className="relative w-full flex items-center justify-center min-h-[310px] sm:min-h-[350px] px-2"
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
          >
            {displayProjects.map((proj, idx) => (
              <FannedCard
                key={idx}
                proj={proj}
                index={idx}
                progress={carouselProgressRaw}
                onHoverArtwork={onHoverArtwork}
              />
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM METADATA BAR ── */}
        <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-[#77756F] border-t border-[#202022]/10 pt-4 mt-4">
          <span>© 2026 Animesh Mondal • All rights reserved</span>
          <span className="px-3 py-1 rounded-full bg-[#202022] text-[#F3F1EA] font-bold shadow-sm">
            @animesh.dev
          </span>
        </div>

      </div>
    </div>
  );
};

export default Project3DLaptopShowcase;
