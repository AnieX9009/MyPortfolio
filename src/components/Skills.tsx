import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolio';
import { ASSET_URLS } from './FloatingTextureMesh';

const categoryIcons: Record<string, string> = {
  Frontend: '⚡',
  Backend: '🔧',
  'State & Tools': '🛠️',
  'Database & Cloud': '☁️',
};

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-dark-800/50">
      <div className="orb orb-3 opacity-50" />

      <div className="section-container" ref={ref}>
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="tag mb-3 inline-flex font-mono text-xs">
            <span className="text-accent-cyan mr-1">[03]</span> Tech Stack & Tools
          </span>
          <h2 className="section-heading text-white">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="text-slate-400 text-sm font-mono max-w-xl mx-auto mt-2">
            Full-stack technologies, mobile frameworks, SAP integration & design tools
          </p>
        </motion.div>

        {/* Featured Tech Tool Badges (Webflow, Framer, Figma) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-14"
        >
          {[
            { name: 'Figma', icon: ASSET_URLS.figma },
            { name: 'Framer', icon: ASSET_URLS.framer },
            { name: 'Webflow', icon: ASSET_URLS.webflow },
          ].map((tool) => (
            <div
              key={tool.name}
              className="glass rounded-2xl px-6 py-3 border border-white/10 flex items-center gap-3 hover:border-accent-cyan/40 transition-all duration-300 group"
            >
              <img src={tool.icon} alt={tool.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-sm font-mono font-semibold text-white">{tool.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300 border border-white/10"
              id={`skill-category-${catIdx}`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${category.color}20`, border: `1px solid ${category.color}30` }}
                >
                  {categoryIcons[category.category] ?? '💡'}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{category.category}</div>
                  <div className="text-slate-500 text-xs font-mono">{category.skills.length} competencies</div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.05, duration: 0.3 }}
                    className="skill-badge cursor-default text-xs"
                    style={{
                      background: `${category.color}15`,
                      borderColor: `${category.color}30`,
                      color: category.color,
                    }}
                    id={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bar row */}
        <motion.div
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { label: 'React / React Native', pct: 95, color: '#5561ff' },
            { label: 'TypeScript / Node', pct: 90, color: '#22d3ee' },
            { label: 'Redux / REST APIs', pct: 88, color: '#a855f7' },
            { label: 'MongoDB & Firebase', pct: 82, color: '#10b981' },
          ].map((item, i) => (
            <div key={item.label} className="glass rounded-xl p-4 border border-white/10" id={`proficiency-${i}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-300">{item.label}</span>
                <span className="text-xs font-mono" style={{ color: item.color }}>{item.pct}%</span>
              </div>
              <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.pct}%` } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
