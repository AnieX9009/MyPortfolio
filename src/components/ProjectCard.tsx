import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isActive?: boolean;
  isHighlighted?: boolean;
  onHoverArtwork?: (url: string | null) => void;
  onSelectCard?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isActive = true,
  isHighlighted = false,
  onHoverArtwork,
  onSelectCard,
}) => {
  const imageList = project.images && project.images.length > 0 ? project.images : [project.mediaUrl];
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Auto-slide screenshots every 4 seconds when the card is active
  useEffect(() => {
    if (!isActive || imageList.length <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection(1);
      setActiveSlideIndex((prev) => (prev + 1) % imageList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isActive, imageList.length]);

  const currentImage = imageList[activeSlideIndex] || project.mediaUrl;

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection(-1);
    setActiveSlideIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideDirection(1);
    setActiveSlideIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSlideDirection(idx >= activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(idx);
  };

  // Icons for card bottom left / icon badges
  const cardIcons = [
    // Lightning / Bolt
    <svg key="bolt" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Sparkle / Globe
    <svg key="spark" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>,
    // Link / Chain
    <svg key="link" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>,
    // Scale / Layers
    <svg key="layers" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
  ];

  const cardIcon = cardIcons[index % cardIcons.length];

  const formattedIndex = `0${index + 1}.`;

  // ══════════════════════════════════════════════════════════════════════════
  // 1. COLLAPSED CARD STATE (White Background with Image & Compact Height)
  // ══════════════════════════════════════════════════════════════════════════
  if (!isActive) {
    return (
      <motion.div
        layout
        transition={{
          layout: { duration: 2.0, ease: [0.16, 1, 0.3, 1] },
        }}
        onClick={onSelectCard}
        onMouseEnter={() => onHoverArtwork?.(currentImage)}
        onMouseLeave={() => onHoverArtwork?.(null)}
        data-cursor="Button"
        className="w-full h-[300px] sm:h-[320px] bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer flex flex-col justify-between group relative overflow-hidden my-auto"
      >
        {/* Top Header: Giant Faint Index Number & Icon Badge */}
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="text-3xl sm:text-4xl font-light font-sans text-gray-300 tracking-tighter select-none group-hover:text-[#0D9488]/60 transition-colors duration-300">
            {formattedIndex}
          </div>
          <div className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 group-hover:bg-[#111827] group-hover:text-white transition-all shadow-sm">
            {cardIcon}
          </div>
        </div>

        {/* Project Thumbnail Image */}
        <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 mb-3 shrink-0 group-hover:scale-[1.03] transition-transform duration-500 shadow-inner">
          <img
            src={currentImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Bottom Section: Title & Subtitle */}
        <div className="mt-auto shrink-0">
          <h4 className="text-xs sm:text-sm font-bold font-sans text-gray-900 leading-snug group-hover:text-[#0D9488] transition-colors duration-300 truncate">
            {project.title}
          </h4>
          <span className="text-[10px] font-mono text-gray-400 block mt-0.5 uppercase tracking-wider truncate">
            {project.category.split('/')[0]}
          </span>
        </div>
      </motion.div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. EXPANDED CARD STATE (Well-Proportioned Image & Clean Layout)
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <motion.article
      layout
      id={`project-card-${project.id}`}
      data-normal-cursor="true"
      transition={{
        layout: { duration: 2.0, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={() => onHoverArtwork?.(currentImage)}
      onMouseLeave={() => onHoverArtwork?.(null)}
      className="w-full min-h-[460px] sm:min-h-[480px] max-h-[500px] bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative flex flex-col justify-between overflow-hidden"
    >
      <div className="overflow-hidden flex flex-col">
        {/* ── TOP GRAPHIC DISPLAY CONTAINER (Proportional Image Banner - No Heavy Cutout) ── */}
        <div className="relative w-full h-44 sm:h-50 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 border border-gray-100 shadow-inner group/banner mb-3 shrink-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
            <motion.img
              key={currentImage}
              custom={slideDirection}
              src={currentImage}
              alt={project.title}
              initial={{
                opacity: 0,
                x: slideDirection > 0 ? 60 : -60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: slideDirection > 0 ? -60 : 60,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              loading="lazy"
              className="w-full h-full object-cover object-center absolute inset-0 group-hover/banner:scale-105 transition-transform duration-700 ease-out"
            />
          </AnimatePresence>

          {/* Ambient Accent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Image Slider Controls (if multiple images) */}
          {imageList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Screenshot"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xs font-bold hover:bg-[#0D9488] transition-all z-10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Screenshot"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-sm font-bold hover:bg-[#0D9488] transition-all z-10"
              >
                ›
              </button>
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                {imageList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleDotClick(e, idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIndex === idx ? 'w-3.5 bg-[#0D9488]' : 'w-1.5 bg-white/50'
                      }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── CARD CONTENT HEADER & ICON BADGE ── */}
        <div className="flex items-center gap-2 mb-1.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center shadow-sm shrink-0">
            {cardIcon}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-wider block">
              {project.subtitle}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold font-sans text-gray-900 tracking-tight leading-snug mb-1 shrink-0">
          {project.title}
        </h3>

        {/* Description */}
        <div className="text-[11px] sm:text-xs text-gray-600 font-sans leading-relaxed mb-2.5 max-h-[76px] overflow-y-auto pr-1 space-y-1.5 shrink-0 [scrollbar-width:thin]">
          {project.description.split('\n\n').map((para, pIdx) => (
            <p key={pIdx}>
              {para}
            </p>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1 mb-2.5 shrink-0">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700 font-medium rounded border border-gray-200/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-gray-100 shrink-0 relative z-20">
        {project.live && project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 h-9 sm:h-9.5 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider bg-[#111827] text-white hover:bg-[#0D9488] hover:border-[#0D9488] hover:shadow-[0_4px_16px_rgba(13,148,136,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 border border-gray-900 shadow-sm group/btn select-none"
          >
            {/* Ambient Top Glare Edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            {/* Hover Light Beam Shine Effect */}
            <div className="btn-shine-beam absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-[160%] -skew-x-20 pointer-events-none" />

            <span className="relative z-10 pointer-events-none">Visit Website</span>
            <span className="relative z-10 text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 pointer-events-none">↗</span>
          </a>
        )}

        {project.source && project.source !== '#' && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 h-9 sm:h-9.5 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-800 hover:bg-gray-200/90 hover:text-black hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-gray-200/90 transition-all duration-300 shadow-xs group/btn select-none"
          >
            {/* Ambient Top Glare Edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            {/* Hover Light Beam Shine Effect */}
            <div className="btn-shine-beam absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[160%] -skew-x-20 pointer-events-none" />

            <svg className="relative z-10 w-3.5 h-3.5 shrink-0 fill-current pointer-events-none" viewBox="0 0 24 24">
              <path className="pointer-events-none" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="relative z-10 pointer-events-none">Visit Git Repo</span>
            <span className="relative z-10 text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 pointer-events-none">↗</span>
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;






