import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import ShowreelSection from './ShowreelSection';

gsap.registerPlugin(ScrollTrigger);

export const HeroScrollTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const nextSectionWrapperRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Create GSAP ScrollTrigger Scrub Timeline over 70vh scroll distance for tight transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=70vh',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // 1. Heading scales 1 -> 0.85 & shifts upward slightly
      tl.to(
        '#hero-heading',
        {
          scale: 0.85,
          y: -30,
          ease: 'power2.out',
        },
        0
      );

      // 2. Supporting text fades 1 -> 0
      tl.to(
        '#hero-subtext',
        {
          opacity: 0,
          y: -20,
          ease: 'power2.out',
        },
        0
      );

      // 3. Hero background shifts upward
      tl.to(
        heroWrapperRef.current,
        {
          y: '-4%',
          ease: 'power2.out',
        },
        0
      );

      // 4. Reveal next section (Showreel) beneath hero via clip-path
      tl.fromTo(
        nextSectionWrapperRef.current,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.out',
        },
        0.1
      );

      // 5. Video media scales 1.05 -> 1.0
      tl.fromTo(
        '#showreel-video-container',
        {
          scale: 1.05,
        },
        {
          scale: 1.0,
          ease: 'power2.out',
        },
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isReducedMotion) {
    return (
      <>
        <HeroSection />
        <ShowreelSection />
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Hero Section Container */}
      <div ref={heroWrapperRef} className="w-full min-h-[90vh]">
        <HeroSection />
      </div>

      {/* Next Section (Showreel) with Vertical Clip-Path Reveal */}
      <div
        ref={nextSectionWrapperRef}
        className="absolute inset-0 z-20 w-full h-full bg-[#F3F1EA] pointer-events-auto flex items-center justify-center"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <ShowreelSection />
      </div>
    </div>
  );
};

export default HeroScrollTransition;
