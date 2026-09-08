import React, { useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';

export const AdminTrigger: React.FC = () => {
  const { setIsAdminOpen, isAdminOpen } = useProjects();

  useEffect(() => {
    // Check if URL has #admin
    const checkHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Global keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(!isAdminOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminOpen, setIsAdminOpen]);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={() => setIsAdminOpen(true)}
        data-cursor="Admin"
        title="Open Portfolio Admin Panel (or press Ctrl+Shift+A)"
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B]/80 hover:bg-[#18181B] backdrop-blur-md border border-white/10 hover:border-[#E65A2B]/60 shadow-lg shadow-black/40 text-gray-300 hover:text-white transition-all text-xs font-mono select-none"
      >
        <span className="w-2 h-2 rounded-full bg-[#E65A2B] group-hover:scale-125 transition-transform" />
        <span className="hidden sm:inline font-medium">ADMIN</span>
        <span className="text-[10px] text-gray-400 group-hover:text-gray-300">⚙</span>
      </button>
    </div>
  );
};
