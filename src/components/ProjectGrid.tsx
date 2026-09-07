import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import Project3DLaptopShowcase from './Project3DLaptopShowcase';

interface ProjectGridProps {
  onHoverArtwork?: (url: string | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onHoverArtwork }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [hoveredDeckIndex, setHoveredDeckIndex] = useState<number | null>(null);

  const allProjects = projectsData;

  const handleSelectProjectFromShowcase = (projectId: string) => {
    const proj = projectsData.find((p) => p.id === projectId);
    if (proj) {
      setHighlightedId(projectId);

      const targetIdx = projectsData.findIndex((p) => p.id === projectId);
      if (targetIdx !== -1) {
        setActiveDeckIndex(targetIdx);
        setHoveredDeckIndex(targetIdx);
      }

      setTimeout(() => {
        const el = document.getElementById(`project-card-${projectId}`) || document.getElementById('explore-repositories');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      setTimeout(() => {
        setHighlightedId(null);
      }, 3500);
    }
  };

  const handlePrevDeck = () => {
    setActiveDeckIndex((prev) => (prev === 0 ? allProjects.length - 1 : prev - 1));
  };

  const handleNextDeck = () => {
    setActiveDeckIndex((prev) => (prev === allProjects.length - 1 ? 0 : prev + 1));
  };

  const currentActiveIndex = hoveredDeckIndex !== null ? hoveredDeckIndex : activeDeckIndex;

  return (
    <section id="projects" className="pt-10 sm:pt-14 pb-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative select-none">

      {/* ── 1. TOP SECTION HEADER ── */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#2DD4BF] mb-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] inline-block animate-pulse" />
          <span>FEATURED CREATIVE WORK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-[#111827] uppercase tracking-tight leading-none"
        >
          SELECTED PROJECTS.
        </motion.h2>
      </div>

      {/* ── 2. 3D LAPTOP INTERACTIVE SHOWCASE ── */}
      <div className="mb-20">
        <Project3DLaptopShowcase
          onHoverArtwork={onHoverArtwork}
          onSelectProject={handleSelectProjectFromShowcase}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          3. EXPLORE REPOSITORIES SECTION (Transparent Container & White Cards)
         ════════════════════════════════════════════════════════════════════════ */}
      <div
        id="explore-repositories"
        className="w-full bg-transparent p-2 sm:p-6 border-0 shadow-none relative overflow-hidden scroll-mt-20"
      >
        {/* ── SECTION TOP HEADER (Badge, Split Title & Subtitle + Explore More Button) ── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-5 border-b border-[#202022]/10 pb-4">
          {/* Left Column: Pill Badge & Headline */}
          <div className="max-w-xl">
            {/* Top Pill Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#202022]/10 shadow-sm text-xs font-mono font-bold text-[#202022] uppercase tracking-wider mb-2.5"
            >
              <svg className="w-3.5 h-3.5 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>MISSION & REPOSITORIES</span>
            </motion.div> */}

            {/* Headline matching image style: We've orchestrated Intelligence */}
            <h3 className="text-3xl sm:text-5xl font-extrabold font-sans text-[#111827] tracking-tight leading-tight">
              EXPlORE MY {' '}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent block sm:inline">
                REPOSITORIES.
              </span>
            </h3>
          </div>

          {/* Right Column: Subtitle & Explore More Capsule Button (Matching Reference Image) */}
          <div className="max-w-md flex flex-col items-start lg:items-end gap-3.5">
            <p className="text-xs sm:text-sm text-[#77756F] font-sans leading-relaxed lg:text-right">
              Uniting full-stack architecture, React apps, and machine learning models into clean, adaptive systems that scale across every repository.
            </p>

            {/* Explore More Capsule Button (Exact match from reference image top right) */}
            <a
              href="https://github.com/animeshmondal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#111827] text-white hover:bg-[#0D9488] transition-all duration-300 shadow-md font-sans text-xs font-bold tracking-wide group"
            >
              <span>Explore More</span>
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </a>
          </div>
        </div>

        {/* ── 4. EXPANDABLE ACCORDION CARDS CONTAINER (Ultra-Smooth 2-Second Motion) ── */}
        <div className="relative z-10 w-full pt-2 flex items-start justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-6xl mx-auto">
            <AnimatePresence mode="sync">
              {allProjects.map((project, index) => {
                const isActive = index === currentActiveIndex;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      flex: isActive ? 2.6 : 1,
                    }}
                    transition={{
                      layout: {
                        duration: 2.0,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      flex: {
                        duration: 2.0,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      opacity: {
                        duration: 0.5,
                      },
                    }}
                    className={`w-full ${isActive ? 'md:w-[480px] lg:w-[530px] xl:w-[570px]' : 'md:w-[165px] lg:w-[185px] xl:w-[200px]'
                      } flex items-center transform-gpu will-change-[flex,transform]`}
                    onMouseEnter={() => {
                      setActiveDeckIndex(index);
                      setHoveredDeckIndex(index);
                    }}
                    onMouseLeave={() => setHoveredDeckIndex(null)}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      isActive={isActive}
                      isHighlighted={highlightedId === project.id}
                      onHoverArtwork={onHoverArtwork}
                      onSelectCard={() => {
                        setActiveDeckIndex(index);
                        setHoveredDeckIndex(index);
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── 5. ACCORDION NAVIGATION CONTROLS & PAGINATION ── */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#202022]/10">
          {/* Left: Previous / Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevDeck}
              className="px-5 py-2.5 rounded-full bg-white text-[#202022] hover:bg-[#0D9488] hover:text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#202022]/15 transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>‹</span>
              <span>Prev Repository</span>
            </button>
            <button
              onClick={handleNextDeck}
              className="px-5 py-2.5 rounded-full bg-[#111827] text-white hover:bg-[#0D9488] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Next Repository</span>
              <span>›</span>
            </button>
          </div>

          {/* Right: Active Dots */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#202022]/10 shadow-sm">
            {allProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveDeckIndex(idx);
                  setHoveredDeckIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${currentActiveIndex === idx ? 'w-6 bg-[#0D9488]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to repository ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProjectGrid;



