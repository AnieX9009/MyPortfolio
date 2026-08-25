import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [cursorState, setCursorState] = useState<'default' | 'view' | 'play' | 'button' | 'viewfinder'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check coarse vs fine pointer & prefers-reduced-motion
    const fineQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!fineQuery.matches || reducedMotionQuery.matches) {
      setIsPointerFine(false);
      return;
    }
    setIsPointerFine(true);

    // Initialize GSAP quickTo for 60fps smooth cursor interpolation
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.18, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.18, ease: 'power2.out' });

    let activeMagneticElement: HTMLElement | null = null;
    let magneticXTo: ((val: number) => void) | null = null;
    let magneticYTo: ((val: number) => void) | null = null;

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Magnetic interaction check on buttons / navigation links (6-10px max threshold)
      const magneticTarget = target.closest('[data-magnetic]') as HTMLElement | null;
      if (magneticTarget) {
        if (activeMagneticElement !== magneticTarget) {
          activeMagneticElement = magneticTarget;
          magneticXTo = gsap.quickTo(magneticTarget, 'x', { duration: 0.25, ease: 'power2.out' });
          magneticYTo = gsap.quickTo(magneticTarget, 'y', { duration: 0.25, ease: 'power2.out' });
        }
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        
        const clampedX = Math.max(-8, Math.min(8, deltaX));
        const clampedY = Math.max(-8, Math.min(8, deltaY));

        if (magneticXTo && magneticYTo) {
          magneticXTo(clampedX);
          magneticYTo(clampedY);
        }
      } else if (activeMagneticElement) {
        gsap.to(activeMagneticElement, { x: 0, y: 0, duration: 0.35, ease: 'power2.out' });
        activeMagneticElement = null;
      }

      // Cursor state inspection
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'View' || type === 'view') {
          setCursorState('view');
          setCursorText('VIEW');
        } else if (type === 'Play' || type === 'play') {
          setCursorState('play');
          setCursorText('PLAY');
        } else if (type === 'Viewfinder' || type === 'viewfinder') {
          setCursorState('viewfinder');
          setCursorText('');
        } else {
          setCursorState('button');
          setCursorText('');
        }
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0.8, duration: 0.15 });
      }
    };

    const onMouseUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (activeMagneticElement) {
        gsap.to(activeMagneticElement, { x: 0, y: 0, duration: 0.3 });
        activeMagneticElement = null;
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isPointerFine) return null;

  // Determine cursor dimensions & styling based on screenshot references
  let styleClasses = 'w-2 h-2 bg-[#202022] border border-[#202022]';

  if (cursorState === 'view') {
    styleClasses = 'w-14 h-14 bg-[#202022]/90 border border-[#202022] text-[#F3F1EA] shadow-lg backdrop-blur-xs';
  } else if (cursorState === 'play') {
    styleClasses = 'w-16 h-16 bg-[#202022] border border-[#F3F1EA]/40 text-[#F3F1EA] shadow-xl animate-once-pulse';
  } else if (cursorState === 'button') {
    styleClasses = 'w-7 h-7 bg-transparent border border-[#202022]/40';
  } else if (cursorState === 'viewfinder') {
    styleClasses = 'w-12 h-12 bg-transparent border border-[#202022]/60 rounded-full flex items-center justify-center';
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out select-none ${styleClasses} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {cursorState === 'viewfinder' ? (
        <div className="w-1.5 h-1.5 rounded-full bg-[#202022]" />
      ) : (
        cursorText && (
          <span
            ref={cursorTextRef}
            className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#F3F1EA]"
          >
            {cursorText}
          </span>
        )
      )}
    </div>
  );
};

export default CustomCursor;
