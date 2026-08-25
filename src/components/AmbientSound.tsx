import React, { useState, useEffect } from 'react';

export const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedState = sessionStorage.getItem('ambient_audio_state');
    if (storedState === 'true') {
      setIsPlaying(true);
    }
  }, []);

  const toggleAudio = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    sessionStorage.setItem('ambient_audio_state', String(newState));
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 font-mono text-xs select-none">
      
      {/* Sound Toggle Button */}
      <button
        onClick={toggleAudio}
        aria-label="Play ambient sound"
        aria-pressed={isPlaying}
        data-cursor="Sound"
        className="w-10 h-10 rounded-full bg-[#202022] text-[#F3F1EA] flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center gap-0.5 h-3">
          {[0.6, 1.0, 0.4, 0.8].map((height, i) => (
            <span
              key={i}
              className={`w-0.5 bg-[#F3F1EA] rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
              }`}
              style={{ height: isPlaying ? `${height * 100}%` : '4px' }}
            />
          ))}
        </div>
      </button>

      {/* Credit Info */}
      <div className="hidden sm:flex flex-col text-[10px] text-[#77756F]">
        <span>AMBIENT AUDIO</span>
        <span className="font-semibold text-[#202022]">{isPlaying ? 'PLAYING' : 'MUTED'}</span>
      </div>

    </div>
  );
};

export default AmbientSound;
