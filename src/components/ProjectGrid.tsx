import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import Project3DLaptopShowcase from './Project3DLaptopShowcase';

interface ProjectGridProps {
  onHoverArtwork?: (url: string | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onHoverArtwork }) => {
  const [activeType, setActiveType] = useState<'work' | 'lab'>('work');

  const filteredProjects = projectsData.filter((p) => p.type === activeType);

  return (
    <section id="projects" className="pt-10 sm:pt-14 pb-28 px-6 sm:px-12 max-w-7xl mx-auto relative select-none">
      
      {/* ── SECTION HEADER ── */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E65A2B] mb-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E65A2B] inline-block animate-pulse" />
          <span>FEATURED CREATIVE WORK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-[#202022] uppercase tracking-tight leading-none"
        >
          SELECTED PROJECTS.
        </motion.h2>
      </div>

      {/* ── 3D LAPTOP INTERACTIVE SHOWCASE (Inspired by reference image) ── */}
      <div className="mb-20">
        <Project3DLaptopShowcase onHoverArtwork={onHoverArtwork} />
      </div>

      {/* ── SEGMENTED PILL SWITCHER ── */}
      <div className="flex justify-between items-center mb-12 border-t border-b border-[#202022]/10 py-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#77756F]">
            FILTER PORTFOLIO
          </span>
          <h3 className="text-xl font-extrabold text-[#202022] uppercase tracking-tight">
            EXPLORE REPOSITORIES
          </h3>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full shadow-sm border border-[#202022]/10 font-sans text-xs">
          <button
            onClick={() => setActiveType('work')}
            data-cursor="Button"
            data-magnetic
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
              activeType === 'work'
                ? 'bg-[#202022] text-[#F3F1EA] shadow'
                : 'text-[#77756F] hover:text-[#202022]'
            }`}
            aria-pressed={activeType === 'work'}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveType('lab')}
            data-cursor="Button"
            data-magnetic
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
              activeType === 'lab'
                ? 'bg-[#202022] text-[#F3F1EA] shadow'
                : 'text-[#77756F] hover:text-[#202022]'
            }`}
            aria-pressed={activeType === 'lab'}
          >
            Labs
          </button>
        </div>
      </div>

      {/* ── 3D CURVED UNFOLDING PROJECT GRID ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onHoverArtwork={onHoverArtwork}
            />
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default ProjectGrid;
