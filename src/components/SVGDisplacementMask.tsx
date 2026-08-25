import React from 'react';

export const SVGDisplacementMask: React.FC = () => {
  return (
    <svg className="hidden absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="smoky-mask-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="12s"
              values="0.03;0.045;0.03"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SVGDisplacementMask;
