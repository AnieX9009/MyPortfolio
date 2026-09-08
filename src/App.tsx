import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import LoadingMask from './components/LoadingMask';
import CustomCursor from './components/CustomCursor';
import CursorRevealWindow from './components/CursorRevealWindow';
import SiteNavigation from './components/SiteNavigation';
import ImmersiveScene from './components/ImmersiveScene';
import ShowreelWidget from './components/ShowreelWidget';
import HeroScrollTransition from './components/HeroScrollTransition';
import ProjectGrid from './components/ProjectGrid';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import AmbientSound from './components/AmbientSound';
import { ProjectProvider } from './context/ProjectContext';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminTrigger } from './components/admin/AdminTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeArtworkUrl, setActiveArtworkUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, [isLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ProjectProvider>
      <SmoothScrollProvider>
        {/* Loading Mask Overlay */}
        {!isLoaded && <LoadingMask onComplete={() => setIsLoaded(true)} />}

        {/* Refined Custom Cursor */}
        <CustomCursor />

        {/* Soft Cursor Reveal Window Into Hidden Layer */}
        <CursorRevealWindow activeArtworkUrl={activeArtworkUrl} />

        {/* Fixed Primary Navigation Header */}
        <SiteNavigation />

        {/* Persistent WebGL Background Scene */}
        <ImmersiveScene
          scrollProgress={scrollProgress}
          mouseX={mouseX}
          mouseY={mouseY}
          isMobile={isMobile}
        />

        {/* Bottom-Left Ambient Audio Button */}
        <AmbientSound />

        {/* Fixed Bottom-Right Showreel Thumbnail Widget */}
        <ShowreelWidget />

        {/* Floating Admin Trigger Button */}
        <AdminTrigger />

        {/* Modal Admin Panel */}
        <AdminPanel />

        {/* Main Document Layout */}
        <main id="main-content" className="relative z-10">
          <HeroScrollTransition />
          <ProjectGrid onHoverArtwork={setActiveArtworkUrl} />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <AboutSection />
          <ContactSection />
        </main>
      </SmoothScrollProvider>
    </ProjectProvider>
  );
};

export default App;
