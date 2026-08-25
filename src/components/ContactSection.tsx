import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-36 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#202022]/10 select-none">

      {/* Invitation Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-sm sm:text-base font-medium text-[#77756F] mb-16 max-w-2xl mx-auto"
      >
        If you've got something strange, epic or smooth you'd like to build, I'd love to hear about it.
      </motion.p>

      {/* Prominent Two-Line Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <a
          href={`mailto:${personalInfo.email}`}
          className="group inline-block text-5xl sm:text-7xl md:text-9xl font-extrabold uppercase tracking-tighter text-[#202022] leading-none"
          data-cursor="Email"
        >
          <span className="block group-hover:-translate-y-1 transition-transform duration-300">
            Let&apos;s build
          </span>
          <span className="block group-hover:translate-y-1 transition-transform duration-300 border-b-4 border-[#202022] pb-2">
            something wild
          </span>
        </a>
      </motion.div>

      {/* Contact Details Row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 border-t border-[#202022]/10 font-mono text-xs"
      >
        {/* Social / Contact Links */}
        <div className="flex items-center flex-wrap gap-6 sm:gap-8">
          <a
            href={`mailto:${personalInfo.email}`}
            data-cursor="Button"
            data-magnetic
            className="text-[#202022] font-medium tracking-wider hover:opacity-50 transition-opacity"
          >
            {personalInfo.email}
          </a>
          <a
            href={`tel:${personalInfo.phone}`}
            data-cursor="Button"
            data-magnetic
            className="text-[#202022] font-medium tracking-wider hover:opacity-50 transition-opacity"
          >
            {personalInfo.phone}
          </a>
          {personalInfo.socials.slice(2).map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Button"
              data-magnetic
              className="text-[#202022] font-medium uppercase tracking-widest hover:opacity-50 transition-opacity"
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Location & Year */}
        <div className="text-[#77756F] uppercase tracking-wider">
          {personalInfo.location} // 2026
        </div>
      </motion.div>

    </section>
  );
};

export default ContactSection;
