import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onHoverArtwork?: (url: string | null) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onHoverArtwork }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, rotateX: 0, scale: 1.02 }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      onMouseEnter={() => onHoverArtwork?.(project.mediaUrl)}
      onMouseLeave={() => onHoverArtwork?.(null)}
      className="group cursor-pointer flex flex-col mb-12 relative"
      data-cursor="View"
    >
      {/* 3D Glass & Metallic Container */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#1B1617] border border-white/10 group-hover:border-[#E65A2B]/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.3)] transition-all duration-500">
        
        {/* Top Header Stripe with Project Index */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between font-mono text-xs text-gray-300">
          <span className="font-bold text-[#E65A2B]">0{index + 1} // PROJECT</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase font-bold text-gray-300">
            {project.category.split('/')[0]}
          </span>
        </div>

        {/* Media Preview Box */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
          <img
            src={project.mediaUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1617] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Floating Action Badge on image */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:bg-[#E65A2B] group-hover:border-[#E65A2B] transition-colors">
            <span>EXPLORE</span>
            <span className="text-xs">↗</span>
          </div>
        </div>

        {/* Card Body & Metadata */}
        <div className="p-6 sm:p-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#E65A2B] transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10 mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/10 text-gray-200 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
