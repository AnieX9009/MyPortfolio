import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="orb orb-1 opacity-40" />
      <div className="orb orb-2 opacity-30" />

      <div className="section-container" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag mb-3 inline-flex font-mono text-xs">
            <span className="text-accent-cyan mr-1">[04]</span> Featured Work
          </span>
          <h2 className="section-heading text-white">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm font-mono max-w-xl mx-auto mt-2">
            Real-world applications built with React Native, React, Node.js & Firebase
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="glass rounded-2xl overflow-hidden group cursor-default flex flex-col border border-white/10"
              id={`project-card-${i}`}
              style={{
                boxShadow: hovered === i ? `0 24px 80px ${project.color}25` : undefined,
                borderColor: hovered === i ? `${project.color}50` : undefined,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Header / Graphic container */}
              <div
                className="h-44 relative overflow-hidden flex items-center justify-center p-6"
                style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}
              >
                <div
                  className="absolute w-32 h-32 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
                  style={{ background: project.color }}
                />
                
                <div className="text-center z-10">
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">PROJECT [{i + 1}]</span>
                  <h4 className="text-2xl font-black tracking-tight" style={{ color: project.color }}>
                    {project.title}
                  </h4>
                </div>

                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.live && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider"
                      style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
                    >
                      LIVE PROJECT
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {project.subtitle}
                  </span>
                </div>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md font-medium"
                      style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-4 border-t border-white/10 pt-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold transition-colors duration-200"
                      style={{ color: project.color }}
                      id={`project-${i}-live-link`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      LIVE APP ↗
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors duration-200"
                      id={`project-${i}-source-link`}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      SOURCE CODE ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
