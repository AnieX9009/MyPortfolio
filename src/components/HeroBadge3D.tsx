import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface HeroBadge3DProps {
  photoUrl?: string;
  name?: string;
  role?: string;
  company?: string;
}

export const HeroBadge3D: React.FC<HeroBadge3DProps> = ({
  photoUrl = '/badge_avatar.jpg',
  name = 'ANIMESH MONDAL',
  role = 'APP DEVELOPER',
  company = 'LUX INDUSTRIES LTD.',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Spring physics ──
  // pendulumX: drives the whole badge swing (rotateZ from top anchor)
  // cardRotX / cardRotY: subtle 3D tilt on just the card face
  const pendulumX = useSpring(0, { stiffness: 40, damping: 18 });
  const springX   = useSpring(0, { stiffness: 60, damping: 22 });
  const springY   = useSpring(0, { stiffness: 60, damping: 22 });

  // Pendulum rotateZ — whole ribbon+card swings ±6° from top
  const pendulumRot = useTransform(pendulumX, [-400, 400], [-6, 6]);

  // Card face subtle 3D tilt
  const cardRotY = useTransform(springX, [-400, 400], [-5, 5]);
  const cardRotX = useTransform(springY, [-400, 400], [4, -4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pendulumX.set(e.clientX - cx);
      springX.set(e.clientX - cx);
      springY.set(e.clientY - cy);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pendulumX, springX, springY]);

  // Dimensions — 10% bigger than previous (176 → 194, 163 → 179)
  const cardW = 179;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      style={{ width: 194, minHeight: 485 }}
    >
      {/*
        ── PENDULUM WRAPPER ──
        Everything (ribbon + clip + card) rotates together
        around the top-center anchor point, like a hanging badge.
      */}
      <motion.div
        style={{
          rotateZ: pendulumRot,
          transformOrigin: 'top center',
          // Perspective on the pendulum wrapper adds depth to the swing
          perspective: 1000,
        }}
        className="relative flex flex-col items-center w-full"
      >
        {/* ── Lanyard ribbon – extends to viewport top ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: -340, width: 30, height: 360, zIndex: 0 }}
        >
          <svg width="30" height="360" viewBox="0 0 30 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ribbonGrad2" x1="0" y1="0" x2="30" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#1a1a1c" />
                <stop offset="30%"  stopColor="#333336" />
                <stop offset="50%"  stopColor="#4a4a4f" />
                <stop offset="70%"  stopColor="#333336" />
                <stop offset="100%" stopColor="#1a1a1c" />
              </linearGradient>
              <pattern id="weave2" x="0" y="0" width="15" height="10" patternUnits="userSpaceOnUse">
                <rect width="15" height="5" fill="#2a2a2d" />
                <rect y="5" width="15" height="5" fill="#222225" />
                <rect x="0" y="0" width="7" height="10" fillOpacity="0.08" fill="#fff" />
              </pattern>
            </defs>
            <rect width="30" height="360" fill="url(#ribbonGrad2)" />
            <rect width="30" height="360" fill="url(#weave2)" opacity="0.5" />
            {/* Edge highlights */}
            <rect width="2"  height="360" fill="#555558" opacity="0.6" />
            <rect x="28" width="2" height="360" fill="#555558" opacity="0.6" />
          </svg>
        </div>

        {/* ── Metal carabiner clip ── */}
        <div
          className="relative flex items-center justify-center z-10"
          style={{ width: 44, height: 34 }}
        >
          <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
            <ellipse cx="22" cy="17" rx="18" ry="12" stroke="#8a8a8e" strokeWidth="5" fill="none" />
            <ellipse cx="22" cy="17" rx="18" ry="12" stroke="#c8c8cc" strokeWidth="2" fill="none" opacity="0.5" />
            <rect x="15" y="12" width="14" height="10" rx="2" fill="#b0b0b4" />
            <rect x="17" y="14" width="10" height="6" rx="1" fill="#d8d8dc" />
          </svg>
        </div>

        {/*
          ── ID CARD ──
          Has its own inner rotateX/Y for the 3D face tilt
          (independent of the pendulum swing)
        */}
        <motion.div
          style={{
            rotateY: cardRotY,
            rotateX: cardRotX,
            transformPerspective: 900,
          }}
          className="relative z-10"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: cardW,
              background: 'linear-gradient(160deg, #f8f6f0 0%, #eceae3 100%)',
              border: '1.5px solid rgba(32,32,34,0.12)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.14)',
            }}
          >
            {/* Card header stripe */}
            <div
              className="w-full px-3 py-2 flex items-center justify-between"
              style={{ background: 'linear-gradient(90deg, #202022 0%, #3a3a3d 100%)' }}
            >
              <span style={{ fontSize: 8, color: '#F3F1EA', fontWeight: 700, letterSpacing: 2, fontFamily: 'monospace' }}>
                ACCESS PASS
              </span>
              <span style={{ fontSize: 7, color: '#888885', fontFamily: 'monospace' }}>ID-2025</span>
            </div>

            {/* Photo */}
            <div className="flex justify-center pt-4 pb-2">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  width: 97,
                  height: 107,
                  border: '2px solid rgba(32,32,34,0.15)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  background: '#d8d6cf',
                }}
              >
                <img
                  src={photoUrl}
                  alt="ID photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.style.background =
                      'linear-gradient(135deg, #c8c6bf 0%, #aea9a0 100%)';
                  }}
                />
              </div>
            </div>

            {/* Name & Role */}
            <div className="px-3 pb-2 text-center">
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#202022',
                  letterSpacing: 1.5,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  lineHeight: 1.3,
                }}
              >
                {name.split(' ')[0]}
                <br />
                {name.split(' ').slice(1).join(' ')}
              </div>
              <div
                className="mt-1 px-2 py-0.5 rounded inline-block"
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: '#F3F1EA',
                  background: '#202022',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                }}
              >
                {role}
              </div>
              <div
                style={{
                  fontSize: 6.5,
                  color: '#77756F',
                  marginTop: 2,
                  fontFamily: 'monospace',
                  letterSpacing: 0.5,
                }}
              >
                {company}
              </div>
            </div>

            {/* Barcode */}
            <div className="px-3 pb-3 flex flex-col items-center">
              <svg width="133" height="26" viewBox="0 0 110 24">
                {Array.from({ length: 40 }, (_, i) => (
                  <rect
                    key={i}
                    x={i * 2.75}
                    y={0}
                    width={i % 3 === 0 ? 2 : 1}
                    height={24}
                    fill="#202022"
                    opacity={0.8 + Math.sin(i) * 0.2}
                  />
                ))}
              </svg>
              <div style={{ fontSize: 6, color: '#aea9a0', fontFamily: 'monospace', marginTop: 2, letterSpacing: 1 }}>
                LUX-2025-AM001
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBadge3D;
