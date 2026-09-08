import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../context/ProjectContext';
import { ProjectItem, ExperienceItem } from '../../data/portfolio';

const QUICK_SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Next.js',
  'Tailwind CSS',
  'Cloudinary',
  'MongoDB',
  'Firebase',
  'Express.js',
  'Redux',
  'React Native',
  'Python',
  'Go',
  'Docker',
  'REST API',
  'GraphQL',
  'Figma',
  'PostgreSQL',
];

const PRESET_COLORS = ['#E65A2B', '#84cc16', '#6366f1', '#06b6d4', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export const AdminPanel: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    resetToDefaults,
    exportProjectsCode,

    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
    resetExperiencesToDefaults,
    exportExperiencesCode,

    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPasscode,
  } = useProjects();

  // Active Tab: 'projects' | 'experiences'
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences'>('projects');

  // Login PIN state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ── Project Editor Modal state ──
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [projectType, setProjectType] = useState<'work' | 'lab'>('work');
  const [mediaUrl, setMediaUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const [techList, setTechList] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [accentColor, setAccentColor] = useState('#E65A2B');

  // ── Experience Editor Modal state ──
  const [isExpEditorOpen, setIsExpEditorOpen] = useState(false);
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expBullets, setExpBullets] = useState<string[]>(['']);

  // ── Export Code Modal state ──
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportTab, setExportTab] = useState<'projects' | 'experiences'>('projects');
  const [copiedExport, setCopiedExport] = useState(false);

  // ── Change PIN modal state ──
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAdminOpen) {
        if (isEditorOpen) {
          setIsEditorOpen(false);
        } else if (isExpEditorOpen) {
          setIsExpEditorOpen(false);
        } else if (isExportOpen) {
          setIsExportOpen(false);
        } else if (isChangePinOpen) {
          setIsChangePinOpen(false);
        } else {
          setIsAdminOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, isEditorOpen, isExpEditorOpen, isExportOpen, isChangePinOpen, setIsAdminOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const success = loginAdmin(pinInput.trim());
    if (success) {
      setLoginError('');
      setPinInput('');
      showToast('Admin access granted! Welcome back.');
    } else {
      setLoginError('Invalid Passcode. Default is "admin2026".');
    }
  };

  // ── Project Modal Handlers ──
  const openCreateProjectModal = () => {
    setEditingProjectId(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setCategory('Web Application / Frontend');
    setProjectType('work');
    setMediaUrl('');
    setGalleryImages([]);
    setNewGalleryInput('');
    setTechList(['React', 'TypeScript', 'Tailwind CSS']);
    setTechInput('');
    setLiveUrl('');
    setSourceUrl('');
    setAccentColor('#E65A2B');
    setIsEditorOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setTitle(proj.title);
    setSubtitle(proj.subtitle || '');
    setDescription(proj.description || '');
    setCategory(proj.category || 'Web Application');
    setProjectType(proj.type || 'work');
    setMediaUrl(proj.mediaUrl || '');
    setGalleryImages(proj.images ? proj.images.filter((img) => img !== proj.mediaUrl) : []);
    setNewGalleryInput('');
    setTechList(proj.tech || []);
    setTechInput('');
    setLiveUrl(proj.live || '');
    setSourceUrl(proj.source || '');
    setAccentColor(proj.color || '#E65A2B');
    setIsEditorOpen(true);
  };

  const handleAddTechTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !techList.includes(clean)) {
      setTechList([...techList, clean]);
    }
    setTechInput('');
  };

  const handleRemoveTechTag = (tagToRemove: string) => {
    setTechList(techList.filter((t) => t !== tagToRemove));
  };

  const handleAddGalleryImage = () => {
    const clean = newGalleryInput.trim();
    if (clean && !galleryImages.includes(clean)) {
      setGalleryImages([...galleryImages, clean]);
      setNewGalleryInput('');
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryImages(galleryImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title.');
      return;
    }
    if (!mediaUrl.trim()) {
      alert('Please enter a main Cloudinary image URL for the project.');
      return;
    }

    const allImages = [mediaUrl.trim(), ...galleryImages];

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        category: category.trim(),
        type: projectType,
        tech: techList.length > 0 ? techList : ['TypeScript'],
        mediaUrl: mediaUrl.trim(),
        images: allImages,
        live: liveUrl.trim() || undefined,
        source: sourceUrl.trim() || undefined,
        color: accentColor,
      });
      showToast(`Updated "${title}"! Original portfolio updated live.`);
    } else {
      addProject({
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        category: category.trim(),
        type: projectType,
        tech: techList.length > 0 ? techList : ['TypeScript'],
        mediaUrl: mediaUrl.trim(),
        images: allImages,
        live: liveUrl.trim() || undefined,
        source: sourceUrl.trim() || undefined,
        color: accentColor,
      });
      showToast(`Added "${title}"! Original portfolio updated live.`);
    }

    setIsEditorOpen(false);
  };

  const handleDeleteProject = (proj: ProjectItem) => {
    if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      deleteProject(proj.id);
      showToast(`Deleted "${proj.title}".`);
    }
  };

  // ── Experience Modal Handlers ──
  const openCreateExpModal = () => {
    setEditingExpIndex(null);
    setExpRole('');
    setExpCompany('');
    setExpLocation('Kolkata, India');
    setExpPeriod('MM/YYYY to Current');
    setExpBullets(['']);
    setIsExpEditorOpen(true);
  };

  const openEditExpModal = (exp: ExperienceItem, idx: number) => {
    setEditingExpIndex(idx);
    setExpRole(exp.role);
    setExpCompany(exp.company);
    setExpLocation(exp.location);
    setExpPeriod(exp.period);
    setExpBullets(exp.bullets && exp.bullets.length > 0 ? [...exp.bullets] : ['']);
    setIsExpEditorOpen(true);
  };

  const handleAddBulletRow = () => {
    setExpBullets([...expBullets, '']);
  };

  const handleUpdateBulletRow = (text: string, index: number) => {
    const next = [...expBullets];
    next[index] = text;
    setExpBullets(next);
  };

  const handleRemoveBulletRow = (index: number) => {
    if (expBullets.length <= 1) {
      setExpBullets(['']);
      return;
    }
    setExpBullets(expBullets.filter((_, i) => i !== index));
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim() || !expCompany.trim()) {
      alert('Please provide Role and Company.');
      return;
    }

    const cleanBullets = expBullets.map((b) => b.trim()).filter(Boolean);
    if (cleanBullets.length === 0) {
      alert('Please add at least one bullet point describing your achievements or responsibilities.');
      return;
    }

    const newExp: ExperienceItem = {
      role: expRole.trim(),
      company: expCompany.trim(),
      location: expLocation.trim(),
      period: expPeriod.trim(),
      bullets: cleanBullets,
    };

    if (editingExpIndex !== null) {
      updateExperience(editingExpIndex, newExp);
      showToast(`Updated "${newExp.role}" at ${newExp.company}!`);
    } else {
      addExperience(newExp);
      showToast(`Added "${newExp.role}" at ${newExp.company}!`);
    }

    setIsExpEditorOpen(false);
  };

  const handleDeleteExperience = (exp: ExperienceItem, idx: number) => {
    if (window.confirm(`Are you sure you want to delete ${exp.role} at ${exp.company}?`)) {
      deleteExperience(idx);
      showToast(`Deleted "${exp.company}".`);
    }
  };

  // ── Code Export Handlers ──
  const getActiveExportCode = () => {
    return exportTab === 'projects' ? exportProjectsCode() : exportExperiencesCode();
  };

  const handleCopyExportCode = () => {
    const code = getActiveExportCode();
    navigator.clipboard.writeText(code);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
    showToast(`Copied ${exportTab === 'projects' ? 'projects' : 'experience'} code to clipboard!`);
  };

  const handleDownloadCode = () => {
    const code = getActiveExportCode();
    const filename = exportTab === 'projects' ? 'portfolio-projects.ts' : 'portfolio-experiences.ts';
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  };

  const handleResetCurrentTab = () => {
    if (activeTab === 'projects') {
      if (window.confirm('Reset all projects to the original default CV projects?')) {
        resetToDefaults();
        showToast('Projects reset to default CV data.');
      }
    } else {
      if (window.confirm('Reset all work experiences to default CV data?')) {
        resetExperiencesToDefaults();
        showToast('Work experiences reset to default CV data.');
      }
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = changeAdminPasscode(oldPin, newPin);
    if (ok) {
      setPinChangeMsg({ text: 'Passcode updated successfully!', isError: false });
      setOldPin('');
      setNewPin('');
      setTimeout(() => {
        setIsChangePinOpen(false);
        setPinChangeMsg(null);
      }, 2000);
    } else {
      setPinChangeMsg({
        text: 'Incorrect current passcode or new passcode is too short (min 4 chars).',
        isError: true,
      });
    }
  };

  if (!isAdminOpen) return null;

  return (
    <div
      data-admin-panel="true"
      data-normal-cursor="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto font-sans text-[#F3F1EA]"
    >
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] px-5 py-3 rounded-xl bg-[#E65A2B] text-white font-medium text-sm shadow-2xl shadow-orange-900/40 border border-orange-400/40 flex items-center gap-2.5 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. AUTHENTICATION / PASSCODE GATE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {!isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative w-full max-w-md bg-[#161618] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 text-center"
        >
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E65A2B] to-amber-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-orange-500/30 mb-5">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">Portfolio Admin Panel</h3>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            Enter your passcode to manage projects, edit work experience dossiers, update Cloudinary photos, and skills.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Passcode (default: admin2026)"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] focus:ring-1 focus:ring-[#E65A2B] transition-all text-center tracking-wider text-base"
              />
            </div>

            {loginError && <p className="text-xs text-red-400 font-medium">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.98]"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-gray-400 font-mono">
            Default passcode: <span className="text-[#FF7A45]">admin2026</span> (can be changed in settings)
          </div>
        </motion.div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════ */
        /* 2. ADMIN DASHBOARD VIEW */
        /* ═══════════════════════════════════════════════════════════════ */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#121214] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#18181B]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E65A2B] to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/30">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">Portfolio Dashboard</h2>
                </div>
                <p className="text-xs text-gray-400">
                  Manage projects and work experience dossiers. Updates appear live on submit.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'projects' ? (
                <button
                  onClick={openCreateProjectModal}
                  className="px-4 py-2 rounded-xl bg-[#E65A2B] hover:bg-[#ff6937] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-orange-600/30 flex items-center gap-1.5"
                >
                  <span className="text-base leading-none">+</span> Add Project
                </button>
              ) : (
                <button
                  onClick={openCreateExpModal}
                  className="px-4 py-2 rounded-xl bg-[#E65A2B] hover:bg-[#ff6937] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-orange-600/30 flex items-center gap-1.5"
                >
                  <span className="text-base leading-none">+</span> Add Experience
                </button>
              )}

              <button
                onClick={() => setIsExportOpen(true)}
                title="Export Code to copy to portfolio.ts"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <span>📋</span> Export
              </button>

              <button
                onClick={() => setIsChangePinOpen(true)}
                title="Change Passcode"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-medium transition-all"
              >
                🔑 PIN
              </button>

              <button
                onClick={handleResetCurrentTab}
                title={`Reset ${activeTab} to defaults`}
                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-medium transition-all"
              >
                ↺ Reset
              </button>

              <button
                onClick={logoutAdmin}
                title="Log out from admin"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs transition-all"
              >
                Logout
              </button>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
                aria-label="Close Admin Panel"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tab Selection Bar */}
          <div className="flex border-b border-white/10 px-5 sm:px-6 bg-[#141416]">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'projects'
                  ? 'border-[#E65A2B] text-white bg-white/[0.02]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>📁 Projects</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('experiences')}
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'experiences'
                  ? 'border-[#E65A2B] text-white bg-white/[0.02]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>💼 Work Experience</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300">
                {experiences.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Project List */}
          {activeTab === 'projects' && (
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-white/5">
              {projects.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-base mb-3">No projects found.</p>
                  <button
                    onClick={openCreateProjectModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E65A2B] text-white text-xs font-bold"
                  >
                    Create Your First Project
                  </button>
                </div>
              ) : (
                projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="pt-3.5 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      {/* Move Controls */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[11px] font-mono text-gray-400 font-bold">#{idx + 1}</span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            disabled={idx === 0}
                            onClick={() => reorderProjects(idx, idx - 1)}
                            className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-[10px] flex items-center justify-center transition-colors"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            disabled={idx === projects.length - 1}
                            onClick={() => reorderProjects(idx, idx + 1)}
                            className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-[10px] flex items-center justify-center transition-colors"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                        <img
                          src={proj.mediaUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://placehold.co/100x100/202022/E65A2B?text=Img';
                          }}
                        />
                        {proj.images && proj.images.length > 1 && (
                          <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-white font-bold">
                            +{proj.images.length - 1}
                          </span>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-white truncate">{proj.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                            {proj.category}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-500/20 text-[#FF7A45] font-bold uppercase">
                            {proj.type}
                          </span>
                        </div>

                        {proj.subtitle && (
                          <p className="text-xs text-gray-400 truncate mb-1.5">{proj.subtitle}</p>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#E65A2B] text-white text-xs font-semibold border border-white/10 hover:border-[#E65A2B] transition-all flex items-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 text-xs border border-red-500/20 transition-all"
                        title="Delete Project"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Work Experience List */}
          {activeTab === 'experiences' && (
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-white/5">
              {experiences.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-base mb-3">No work experiences found.</p>
                  <button
                    onClick={openCreateExpModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E65A2B] text-white text-xs font-bold"
                  >
                    Add First Experience
                  </button>
                </div>
              ) : (
                experiences.map((exp, idx) => (
                  <div
                    key={`${exp.company}-${idx}`}
                    className="pt-3.5 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      {/* Move Controls */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[11px] font-mono text-gray-400 font-bold">#{idx + 1}</span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            disabled={idx === 0}
                            onClick={() => reorderExperiences(idx, idx - 1)}
                            className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-[10px] flex items-center justify-center transition-colors"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            disabled={idx === experiences.length - 1}
                            onClick={() => reorderExperiences(idx, idx + 1)}
                            className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-[10px] flex items-center justify-center transition-colors"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Folder Icon / Badge */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shrink-0">
                        0{idx + 1}
                      </div>

                      {/* Dossier Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                            {exp.role}
                          </h4>
                          <span className="text-xs font-mono text-[#FF7A45] font-bold">
                            @ {exp.company}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-2 flex-wrap">
                          <span>📅 {exp.period}</span>
                          <span>📍 {exp.location}</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300">
                            {exp.bullets.length} bullets
                          </span>
                        </div>

                        {/* First bullet preview snippet */}
                        {exp.bullets.length > 0 && (
                          <p className="text-xs text-gray-400 truncate max-w-xl">
                            • {exp.bullets[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => openEditExpModal(exp, idx)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#E65A2B] text-white text-xs font-semibold border border-white/10 hover:border-[#E65A2B] transition-all flex items-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp, idx)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 text-xs border border-red-500/20 transition-all"
                        title="Delete Experience"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer Guide Note */}
          <div className="p-3.5 bg-[#141416] border-t border-white/5 text-center text-xs text-gray-400 font-mono">
            💡 Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">Ctrl + Shift + A</kbd> anytime
            on your portfolio to open this Admin Panel.
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. PROJECT ADD / EDIT MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isEditorOpen && (
          <div
            data-admin-panel="true"
            data-normal-cursor="true"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#18181B] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingProjectId ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Paste your Cloudinary image link and description. Changes apply immediately upon submit.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-5">
                {/* Row 1: Title & Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. CARBON - OFFSET"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. FINANCIAL & ECOLOGICAL WEB APP"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>
                </div>

                {/* Row 2: Category & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Web Application / Gamification"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Project Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setProjectType('work')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          projectType === 'work'
                            ? 'bg-[#E65A2B] text-white shadow-md shadow-orange-600/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        Client / Live Work
                      </button>
                      <button
                        type="button"
                        onClick={() => setProjectType('lab')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          projectType === 'lab'
                            ? 'bg-[#E65A2B] text-white shadow-md shadow-orange-600/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        R&D / Lab Project
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 3: CLOUDINARY MAIN IMAGE LINK & LIVE PREVIEW */}
                <div className="p-4 rounded-2xl bg-black/40 border border-orange-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase text-[#FF7A45] font-bold tracking-wider">
                      ★ Cloudinary Image Link (Main Cover Photo) *
                    </label>
                    <span className="text-[11px] font-mono text-gray-400">Direct CDN URL</span>
                  </div>

                  <input
                    type="url"
                    required
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/deitdqyiw/image/upload/v12345/my-image.png"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs font-mono"
                  />

                  {/* Real-time Image Preview */}
                  {mediaUrl && (
                    <div className="mt-2 p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-4">
                      <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                        <img
                          src={mediaUrl}
                          alt="Cloudinary Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://placehold.co/120x80/202022/FF0000?text=Invalid+URL';
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-300 overflow-hidden">
                        <p className="font-bold text-emerald-400 mb-0.5">✓ Image Live Preview</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-md font-mono">{mediaUrl}</p>
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    💡 <strong>Tip:</strong> In Cloudinary Media Library, click the image and click{' '}
                    <strong>"Copy URL"</strong>, then paste it here directly. No code changes needed!
                  </p>
                </div>

                {/* Row 4: ADDITIONAL GALLERY SCREENSHOTS */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <label className="block text-xs font-mono uppercase text-gray-300 font-bold">
                    Additional Gallery Screenshots (Optional Cloudinary Links)
                  </label>
                  <p className="text-[11px] text-gray-400">
                    These will auto-slide on the expanded project card carousel.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newGalleryInput}
                      onChange={(e) => setNewGalleryInput(e.target.value)}
                      placeholder="Add another Cloudinary URL..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      + Add
                    </button>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video bg-black/40"
                        >
                          <img src={img} alt="screenshot" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 5: Description */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Project Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about the project goals, architecture, features, and challenges solved..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm leading-relaxed"
                  />
                </div>

                {/* Row 6: Required Languages / Skills / Tech Stack */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-gray-400 font-bold">
                    Languages, Skills & Tech Stack Needed
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleAddTechTag(techInput);
                        }
                      }}
                      placeholder="Type skill & press Enter (e.g. React, Node.js, Cloudinary)..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTechTag(techInput)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Add Tag
                    </button>
                  </div>

                  {/* Active Tech Chips */}
                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {techList.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E65A2B]/20 text-[#FF7A45] border border-[#E65A2B]/40 text-xs font-mono font-bold"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTechTag(tag)}
                            className="text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick-Pick Popular Skills */}
                  <div className="pt-2">
                    <span className="text-[10px] text-gray-400 block mb-1 font-mono uppercase">Quick Add:</span>
                    <div className="flex flex-wrap gap-1">
                      {QUICK_SKILLS.map((sk) => (
                        <button
                          key={sk}
                          type="button"
                          disabled={techList.includes(sk)}
                          onClick={() => handleAddTechTag(sk)}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300 transition-colors"
                        >
                          +{sk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 7: Live URL & Source Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Live Project URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://myproject.vercel.app"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Source Code / GitHub URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://github.com/AnieX9009/project"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Row 8: Card Accent Color */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccentColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-full transition-transform ${
                          accentColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                        }`}
                      />
                    ))}
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="ml-2 w-24 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white text-center"
                    />
                  </div>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all active:scale-[0.98]"
                  >
                    {editingProjectId ? '✓ Save Changes' : '✓ Add Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. WORK EXPERIENCE ADD / EDIT MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isExpEditorOpen && (
          <div
            data-admin-panel="true"
            data-normal-cursor="true"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#18181B] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingExpIndex !== null ? 'Edit Work Experience' : 'Add Work Experience'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Updates the career dossier folder cards in the Work Experience section.
                  </p>
                </div>
                <button
                  onClick={() => setIsExpEditorOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveExperience} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Job Role / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      placeholder="e.g. FULL STACK DEVELOPER"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={expCompany}
                      onChange={(e) => setExpCompany(e.target.value)}
                      placeholder="e.g. LUX INDUSTRIES LIMITED"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Location
                    </label>
                    <input
                      type="text"
                      value={expLocation}
                      onChange={(e) => setExpLocation(e.target.value)}
                      placeholder="e.g. Kolkata, India"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Period / Dates
                    </label>
                    <input
                      type="text"
                      value={expPeriod}
                      onChange={(e) => setExpPeriod(e.target.value)}
                      placeholder="e.g. 11/2025 to Current"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold">
                      Key Responsibilities & Achievements (Bullet Points) *
                    </label>
                    <button
                      type="button"
                      onClick={handleAddBulletRow}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#E65A2B] text-white text-xs font-bold transition-all"
                    >
                      + Add Bullet
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {expBullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-xs font-mono text-[#E65A2B] mt-2 shrink-0">•</span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleUpdateBulletRow(e.target.value, bIdx)}
                          placeholder={`Bullet point #${bIdx + 1} description...`}
                          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E65A2B] text-xs leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBulletRow(bIdx)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors mt-1"
                          title="Remove bullet"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit & Cancel */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsExpEditorOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all active:scale-[0.98]"
                  >
                    {editingExpIndex !== null ? '✓ Save Experience' : '✓ Add Experience'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 5. EXPORT CODE MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isExportOpen && (
          <div
            data-admin-panel="true"
            data-normal-cursor="true"
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#18181B] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Export Generated Code</h3>
                  <p className="text-xs text-gray-400">
                    Copy or download code to paste into <code>src/data/portfolio.ts</code>.
                  </p>
                </div>
                <button
                  onClick={() => setIsExportOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Export Tabs */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setExportTab('projects')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    exportTab === 'projects'
                      ? 'bg-[#E65A2B] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Projects Code
                </button>
                <button
                  onClick={() => setExportTab('experiences')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    exportTab === 'experiences'
                      ? 'bg-[#E65A2B] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Work Experience Code
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col bg-black/50 rounded-2xl border border-white/10 p-3 mb-4">
                <pre className="text-[11px] font-mono text-emerald-400 overflow-auto flex-1 p-2">
                  {getActiveExportCode()}
                </pre>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleDownloadCode}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                >
                  Download .ts File
                </button>
                <button
                  onClick={handleCopyExportCode}
                  className="px-5 py-2 rounded-xl bg-[#E65A2B] hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/30"
                >
                  {copiedExport ? '✓ Copied!' : 'Copy Code to Clipboard'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 6. CHANGE PASSCODE MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isChangePinOpen && (
          <div
            data-admin-panel="true"
            data-normal-cursor="true"
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="text-base font-bold text-white">Change Admin Passcode</h3>
                <button
                  onClick={() => setIsChangePinOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPin}
                    onChange={(e) => setOldPin(e.target.value)}
                    placeholder="Enter current passcode"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1">
                    New Passcode (min 4 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new passcode"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                  />
                </div>

                {pinChangeMsg && (
                  <p
                    className={`text-xs font-medium ${
                      pinChangeMsg.isError ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {pinChangeMsg.text}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangePinOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#E65A2B] hover:bg-orange-600 text-white text-xs font-bold"
                  >
                    Update Passcode
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
