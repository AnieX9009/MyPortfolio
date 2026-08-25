import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/portfolio';

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dark-800/40 border-y border-white/5">
      <div className="orb orb-1 opacity-30" />

      <div className="section-container" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag mb-3 inline-flex font-mono text-xs">
            <span className="text-accent-cyan font-mono mr-1">[02]</span> Career Journey
          </span>
          <h2 className="section-heading text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 font-mono">
            Proven track record delivering web & mobile applications at scale
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/10 relative group hover:border-primary-500/40 transition-all duration-300"
              id={`experience-card-${index}`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent-cyan" />
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-200">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-primary-400 font-medium text-sm mt-1 sm:ml-6">
                    {exp.company} <span className="text-slate-500">• {exp.location}</span>
                  </div>
                </div>
                <span className="tag font-mono text-xs bg-primary-500/10 border-primary-500/20 text-primary-300 self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="space-y-3 text-slate-300 text-sm">
                {(exp.bullets ?? exp.points ?? []).map((pt: string, pIdx: number) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
