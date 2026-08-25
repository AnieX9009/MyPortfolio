import React from 'react';

interface PerformanceHUDProps {
  performanceTier: 'high' | 'saver';
  setPerformanceTier: (tier: 'high' | 'saver') => void;
  audioOn: boolean;
  setAudioOn: (on: boolean) => void;
}

export const PerformanceHUD: React.FC<PerformanceHUDProps> = ({
  performanceTier,
  setPerformanceTier,
  audioOn,
  setAudioOn,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-mono text-xs select-none">
      {/* Audio Engine Button */}
      <button
        onClick={() => setAudioOn(!audioOn)}
        className="glass rounded-xl px-3.5 py-2 border border-white/10 flex items-center gap-2 hover:border-accent-cyan/40 transition-all text-slate-300 hover:text-white"
        title="Toggle Ambient Audio"
      >
        <span className={`w-2 h-2 rounded-full ${audioOn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
        <span className="text-[11px]">AUDIO: {audioOn ? 'ON' : 'OFF'}</span>
      </button>

      {/* Performance Tier Switcher */}
      <div className="glass rounded-xl p-1 border border-white/10 flex items-center gap-1">
        <button
          onClick={() => setPerformanceTier('high')}
          className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            performanceTier === 'high'
              ? 'bg-primary-500 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          HIGH (60FPS)
        </button>
        <button
          onClick={() => setPerformanceTier('saver')}
          className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
            performanceTier === 'saver'
              ? 'bg-accent-purple text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          SAVER
        </button>
      </div>
    </div>
  );
};

export default PerformanceHUD;
