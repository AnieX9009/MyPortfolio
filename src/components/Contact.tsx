import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="orb orb-1 opacity-50" />
      <div className="orb orb-2 opacity-40" />

      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Headline & Info (Inspired by mathis-biabiany.fr) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <span className="tag mb-4 inline-flex font-mono text-xs">
              <span className="text-accent-cyan mr-1">[06]</span> Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              Let's build <br />
              <span className="gradient-text">something wild</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Have an exciting project, app concept, or full-stack opportunity in mind? Feel free to reach out. I'm always open to discussing new ideas!
            </p>

            {/* Contact details */}
            <div className="space-y-4 font-mono">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'EMAIL',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'PHONE',
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'LOCATION',
                  value: personalInfo.location,
                  href: undefined,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                  id={`contact-info-${i}`}
                >
                  <div className="w-11 h-11 glass rounded-xl flex items-center justify-center text-accent-cyan border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-slate-200 hover:text-accent-cyan transition-colors duration-200 text-xs sm:text-sm font-semibold">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-slate-200 text-xs sm:text-sm font-semibold">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-6"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5 border border-white/10"
              id="contact-form"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                <h3 className="text-white font-bold text-lg font-mono">SEND_MESSAGE</h3>
                <span className="text-xs font-mono text-accent-cyan">[DIRECT]</span>
              </div>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-2">
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/30 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/30 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Hi Animesh, let's talk about..."
                  className="w-full bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/30 transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                id="contact-submit-btn"
                className="w-full btn-primary justify-center font-mono text-xs py-3.5"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {submitted ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    MESSAGE TRANSMITTED!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    SEND MESSAGE
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
