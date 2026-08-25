import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1 opacity-40" />
      <div className="orb orb-2 opacity-30" />

      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="tag mb-4 inline-flex font-mono text-xs">
                <span className="text-accent-cyan mr-1">[01]</span> About Me
              </span>
            </motion.div>

            <motion.h2
              className="section-heading text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Building <span className="gradient-text">Impactful</span> Software Solutions
            </motion.h2>

            <motion.div
              className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p>
                I'm <strong className="text-white font-semibold">{personalInfo.name}</strong>, a Full Stack & App Developer based in Kanchrapara, India. Currently working as an App Developer at <span className="text-primary-400 font-medium">Lux Industries Limited</span>, where I build data management dashboards with SAP integration and machine learning analytics.
              </p>
              <p>
                Graduated with a B.Tech in Computer Science & Engineering from <span className="text-white">Guru Nanak Institute of Technology (GPA: 8.5)</span>, I possess hands-on expertise with <span className="text-accent-cyan font-mono text-xs">React, React Native, Node.js, Express, Redux, TypeScript & MongoDB</span>.
              </p>
            </motion.div>

            {/* Quick Stats list */}
            <motion.div
              className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">Role</span>
                <span className="text-sm font-semibold text-white">App Developer</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">Company</span>
                <span className="text-sm font-semibold text-primary-400">Lux Industries Ltd</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">Location</span>
                <span className="text-sm font-semibold text-white">Kanchrapara, WB</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">Degree</span>
                <span className="text-sm font-semibold text-accent-cyan">B.Tech CSE (8.5 GPA)</span>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a href="#projects" className="btn-primary text-xs font-mono" id="about-projects-btn">
                SEE MY PROJECTS
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-outline text-xs font-mono"
                id="about-contact-btn"
              >
                GET IN TOUCH
              </a>
            </motion.div>
          </div>

          {/* Right: stats cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { label: 'GPA Score', value: '8.5', sub: 'B.Tech CSE', color: '#5561ff' },
              { label: 'Current Role', value: 'Lux Cozi', sub: 'App Developer', color: '#22d3ee' },
              { label: 'Languages', value: '4', sub: 'Bengali, Eng, Hin, Mar', color: '#a855f7' },
              { label: 'Graduation', value: '2024', sub: 'Guru Nanak Inst.', color: '#10b981' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-hover rounded-2xl p-6 text-center group cursor-default border border-white/10"
                id={`about-stat-${i}`}
              >
                <div
                  className="text-3xl font-black mb-1 transition-all duration-300"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-xs mb-1">{stat.label}</div>
                <div className="text-slate-500 text-[11px] font-mono">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
