import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education, languages } from '../data/portfolio';

const Education = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-28 relative overflow-hidden bg-dark-800/50">
      <div className="orb orb-3 opacity-40" />

      <div className="section-container" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Education Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="tag mb-3 inline-flex font-mono text-xs">
                <span className="text-accent-cyan mr-1">[05]</span> Academics
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Education <span className="gradient-text">Timeline</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px timeline-line" />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative pl-12"
                    id={`education-${i}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-3 w-8 h-8 rounded-full bg-dark-700 border-2 border-primary-500/50 flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan" />
                    </div>

                    <div className="glass rounded-2xl p-5 hover:border-primary-500/30 transition-all duration-300 border border-white/10">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-white font-semibold text-sm leading-snug">
                          {edu.institution}
                        </h3>
                        <span className="text-xs font-mono text-slate-400 flex-shrink-0">{edu.period}</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-3">{edu.degree}</p>
                      <span
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold"
                        style={{ background: 'rgba(85,97,255,0.15)', color: '#7a91ff', border: '1px solid rgba(85,97,255,0.3)' }}
                      >
                        ★ {edu.score}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-10"
            >
              <span className="tag mb-3 inline-flex font-mono text-xs">
                <span className="text-accent-cyan mr-1">[05.2]</span> Communication
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Language <span className="gradient-text">Proficiency</span>
              </h2>
            </motion.div>

            <div className="space-y-5">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="glass rounded-2xl p-5 border border-white/10"
                  id={`language-${i}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center font-bold text-accent-cyan text-xs font-mono">
                        {lang.level}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{lang.name}</div>
                        <div className="text-slate-400 text-xs">{lang.proficiency}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #5561ff, #22d3ee)`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* CEFR Scale card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="glass rounded-xl p-4 mt-4 border border-white/10"
              >
                <p className="text-[10px] text-slate-500 mb-2 font-mono uppercase tracking-wider">CEFR Standard Scale</p>
                <div className="flex gap-2 flex-wrap font-mono">
                  {['A1 Basic', 'A2 Elem', 'B1 Inter', 'B2 Upper', 'C1 Adv', 'C2 Mastery'].map((level) => (
                    <span key={level} className="text-[10px] px-2 py-0.5 rounded bg-dark-700 text-slate-300 border border-white/5">
                      {level}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
