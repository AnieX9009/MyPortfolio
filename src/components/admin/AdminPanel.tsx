import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../context/ProjectContext';
import { ProjectItem, ExperienceItem } from '../../data/portfolio';
import { getActiveFirebaseConfig, FirebaseConfig } from '../../services/firebase';

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

    dbStatus,
    saveDbCredentials,
    disconnectDb,
    seedInitialData,
    refreshCloudData,

    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPasscode,
  } = useProjects();

  // Active Tab: 'projects' | 'experiences' | 'database'
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'database'>('projects');

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

  // ── Database Settings Form state ──
  const [dbApiKey, setDbApiKey] = useState('');
  const [dbAuthDomain, setDbAuthDomain] = useState('');
  const [dbProjectId, setDbProjectId] = useState('');
  const [dbStorageBucket, setDbStorageBucket] = useState('');
  const [dbSenderId, setDbSenderId] = useState('');
  const [dbAppId, setDbAppId] = useState('');
  const [dbTestResult, setDbTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSavingDb, setIsSavingDb] = useState(false);
  const [isSeedingDb, setIsSeedingDb] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  // Populate Database form with existing config if available
  useEffect(() => {
    const existing = getActiveFirebaseConfig();
    if (existing) {
      setDbApiKey(existing.apiKey || '');
      setDbAuthDomain(existing.authDomain || '');
      setDbProjectId(existing.projectId || '');
      setDbStorageBucket(existing.storageBucket || '');
      setDbSenderId(existing.messagingSenderId || '');
      setDbAppId(existing.appId || '');
    }
  }, [isAdminOpen]);

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

  const handleSaveProject = async (e: React.FormEvent) => {
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
      await updateProject(editingProjectId, {
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
      showToast(`Updated "${title}"! Saved ${dbStatus.isConnected ? 'to Cloud Firestore' : 'locally'}.`);
    } else {
      await addProject({
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
      showToast(`Added "${title}"! Saved ${dbStatus.isConnected ? 'to Cloud Firestore' : 'locally'}.`);
    }

    setIsEditorOpen(false);
  };

  const handleDeleteProject = async (proj: ProjectItem) => {
    if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      await deleteProject(proj.id);
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

  const handleSaveExperience = async (e: React.FormEvent) => {
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
      await updateExperience(editingExpIndex, newExp);
      showToast(`Updated "${newExp.role}" at ${newExp.company}!`);
    } else {
      await addExperience(newExp);
      showToast(`Added "${newExp.role}" at ${newExp.company}!`);
    }

    setIsExpEditorOpen(false);
  };

  const handleDeleteExperience = async (exp: ExperienceItem, idx: number) => {
    if (window.confirm(`Are you sure you want to delete ${exp.role} at ${exp.company}?`)) {
      await deleteExperience(idx);
      showToast(`Deleted "${exp.company}".`);
    }
  };

  // ── Database Handlers ──
  const handleConnectDatabase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbApiKey.trim() || !dbProjectId.trim() || !dbAppId.trim()) {
      setDbTestResult({
        success: false,
        message: 'Please provide at least API Key, Project ID, and App ID from your Firebase Console.',
      });
      return;
    }

    setIsSavingDb(true);
    setDbTestResult(null);

    const config: FirebaseConfig = {
      apiKey: dbApiKey.trim(),
      authDomain: dbAuthDomain.trim() || `${dbProjectId.trim()}.firebaseapp.com`,
      projectId: dbProjectId.trim(),
      storageBucket: dbStorageBucket.trim() || `${dbProjectId.trim()}.appspot.com`,
      messagingSenderId: dbSenderId.trim() || undefined,
      appId: dbAppId.trim(),
    };

    const res = await saveDbCredentials(config);
    setIsSavingDb(false);
    setDbTestResult(res);

    if (res.success) {
      showToast('Connected to Cloud Firestore! Database is active.');
    }
  };

  const handleSeedDatabase = async () => {
    if (!dbStatus.isConnected) {
      alert('Please connect your Firebase Firestore database first before seeding.');
      return;
    }

    if (
      !window.confirm(
        `Upload all ${projects.length} projects and ${experiences.length} work experiences to your Cloud Firestore database?`
      )
    ) {
      return;
    }

    setIsSeedingDb(true);
    setSeedResult(null);

    const res = await seedInitialData();
    setIsSeedingDb(false);

    if (res.success) {
      setSeedResult(res.message);
      showToast('All portfolio data uploaded to Firestore!');
    } else {
      setSeedResult(`Error: ${res.message}`);
    }
  };

  const handleDisconnectDatabase = () => {
    if (window.confirm('Disconnect from Cloud Database and revert to local storage?')) {
      disconnectDb();
      setDbApiKey('');
      setDbAuthDomain('');
      setDbProjectId('');
      setDbStorageBucket('');
      setDbSenderId('');
      setDbAppId('');
      setDbTestResult(null);
      setSeedResult(null);
      showToast('Disconnected from Cloud DB. Reverted to local mode.');
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
    } else if (activeTab === 'experiences') {
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
            Enter your passcode to manage projects, edit work experience dossiers, sync to free Cloud Firestore DB, and customize details.
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
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">Portfolio Dashboard</h2>
                  {/* Cloud DB Connection Status Pill */}
                  <button
                    onClick={() => setActiveTab('database')}
                    title="Click to view Database Settings"
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                      dbStatus.isConnected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : dbStatus.isConfigured
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                        : 'bg-white/10 text-gray-400 border border-white/10 hover:bg-white/15'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dbStatus.isConnected
                          ? 'bg-emerald-400 animate-pulse'
                          : dbStatus.isConfigured
                          ? 'bg-amber-400'
                          : 'bg-gray-400'
                      }`}
                    />
                    <span>{dbStatus.isConnected ? 'Firestore Sync Active' : 'Local Storage Mode'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Manage projects and work experience dossiers. Updates persist in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'projects' && (
                <button
                  onClick={openCreateProjectModal}
                  className="px-4 py-2 rounded-xl bg-[#E65A2B] hover:bg-[#ff6937] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-orange-600/30 flex items-center gap-1.5"
                >
                  <span className="text-base leading-none">+</span> Add Project
                </button>
              )}

              {activeTab === 'experiences' && (
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

              {activeTab !== 'database' && (
                <button
                  onClick={handleResetCurrentTab}
                  title={`Reset ${activeTab} to defaults`}
                  className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs font-medium transition-all"
                >
                  ↺ Reset
                </button>
              )}

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
          <div className="flex border-b border-white/10 px-5 sm:px-6 bg-[#141416] overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
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
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
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

            <button
              onClick={() => setActiveTab('database')}
              className={`py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'database'
                  ? 'border-[#E65A2B] text-white bg-white/[0.02]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>☁️ Cloud Database & Sync</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  dbStatus.isConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-gray-400'
                }`}
              >
                {dbStatus.isConnected ? 'ONLINE' : 'SETUP'}
              </span>
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB 1: PROJECT LIST */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {activeTab === 'projects' && (
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-white/5">
              {projects.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-base mb-3">No projects found.</p>
                  <button
                    onClick={openCreateProjectModal}
                    className="px-5 py-2.5 rounded-xl bg-[#E65A2B] text-white text-xs font-bold"
                  >
                    Add First Project
                  </button>
                </div>
              ) : (
                projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="pt-3.5 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all"
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
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative group">
                        <img
                          src={proj.mediaUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        {proj.images && proj.images.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/75 px-1 py-0.5 rounded text-[9px] font-mono text-white">
                            +{proj.images.length - 1}
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                            {proj.title}
                          </h4>
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider"
                            style={{
                              backgroundColor: `${proj.color || '#E65A2B'}22`,
                              color: proj.color || '#E65A2B',
                              borderColor: `${proj.color || '#E65A2B'}44`,
                              borderWidth: '1px',
                            }}
                          >
                            {proj.type === 'lab' ? 'Lab / Concept' : 'Live Work'}
                          </span>
                        </div>

                        <p className="text-xs font-mono text-gray-400 mb-2 truncate max-w-xl">
                          {proj.subtitle || proj.category}
                        </p>

                        {/* Tech Pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {proj.tech?.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-gray-300"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.tech && proj.tech.length > 5 && (
                            <span className="text-[10px] text-gray-400 font-mono">
                              +{proj.tech.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs border border-white/10 transition-all"
                          title="Open Live URL"
                        >
                          🔗
                        </a>
                      )}
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

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB 2: WORK EXPERIENCE LIST */}
          {/* ═══════════════════════════════════════════════════════════════ */}
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

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TAB 3: CLOUD DATABASE & SYNC */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {activeTab === 'database' && (
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
              {/* Status Banner */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  dbStatus.isConnected
                    ? 'bg-emerald-950/30 border-emerald-500/30'
                    : 'bg-amber-950/20 border-amber-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        dbStatus.isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {dbStatus.isConnected ? '🟢' : '⚡'}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {dbStatus.isConnected ? 'Cloud Firestore DB Connected' : 'Local Storage Mode Active'}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {dbStatus.isConnected
                          ? 'Your portfolio is synced to Google Cloud Firestore. Changes are live for all visitors worldwide.'
                          : 'Connect Google Firebase below to permanently save added projects and sync them globally.'}
                      </p>
                    </div>
                  </div>

                  {dbStatus.isConnected && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={refreshCloudData}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-200 transition-all"
                      >
                        🔄 Refresh Data
                      </button>
                      <button
                        onClick={handleDisconnectDatabase}
                        className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300 transition-all"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 1-Click Initial Seeding Tool (Available once connected) */}
              {dbStatus.isConnected && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/40 via-[#18181B] to-[#18181B] border border-orange-500/25">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>⚡ 1-Click Seed Initial Data to Cloud Database</span>
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xl">
                        Upload all current projects ({projects.length}) and work experiences ({experiences.length})
                        into your Firestore collections so your live database is immediately ready.
                      </p>
                    </div>
                    <button
                      onClick={handleSeedDatabase}
                      disabled={isSeedingDb}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/30 whitespace-nowrap"
                    >
                      {isSeedingDb ? 'Uploading to Cloud...' : '⚡ Seed All Data'}
                    </button>
                  </div>
                  {seedResult && (
                    <p className="mt-3 text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                      ✓ {seedResult}
                    </p>
                  )}
                </div>
              )}

              {/* Configuration Form */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">Firebase Credentials</h4>
                    <p className="text-xs text-gray-400">
                      Get these free keys from Firebase Console ➔ Project Settings ➔ Web App
                    </p>
                  </div>
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#FF7A45] hover:underline flex items-center gap-1"
                  >
                    Open Firebase Console ↗
                  </a>
                </div>

                <form onSubmit={handleConnectDatabase} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        API Key *
                      </label>
                      <input
                        type="text"
                        value={dbApiKey}
                        onChange={(e) => setDbApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        Project ID *
                      </label>
                      <input
                        type="text"
                        value={dbProjectId}
                        onChange={(e) => setDbProjectId(e.target.value)}
                        placeholder="my-portfolio-app"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        App ID *
                      </label>
                      <input
                        type="text"
                        value={dbAppId}
                        onChange={(e) => setDbAppId(e.target.value)}
                        placeholder="1:123456789:web:abcdef"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        Auth Domain
                      </label>
                      <input
                        type="text"
                        value={dbAuthDomain}
                        onChange={(e) => setDbAuthDomain(e.target.value)}
                        placeholder="my-portfolio-app.firebaseapp.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        Storage Bucket (optional)
                      </label>
                      <input
                        type="text"
                        value={dbStorageBucket}
                        onChange={(e) => setDbStorageBucket(e.target.value)}
                        placeholder="my-portfolio-app.appspot.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                        Messaging Sender ID (optional)
                      </label>
                      <input
                        type="text"
                        value={dbSenderId}
                        onChange={(e) => setDbSenderId(e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                      />
                    </div>
                  </div>

                  {dbTestResult && (
                    <div
                      className={`p-3 rounded-xl text-xs font-mono border ${
                        dbTestResult.success
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                          : 'bg-red-950/40 text-red-300 border-red-500/30'
                      }`}
                    >
                      {dbTestResult.success ? '✓ ' : '✕ '} {dbTestResult.message}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSavingDb}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/30"
                    >
                      {isSavingDb ? 'Connecting...' : 'Save & Connect Cloud DB'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Step-by-Step Tutorial Box */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-gray-300 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📖 Quick 3-Step Setup Guide (100% Free Forever)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-400 leading-relaxed font-mono">
                  <li>
                    Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-[#FF7A45] underline">Firebase Console</a> and click <strong>"Add project"</strong>.
                  </li>
                  <li>
                    In the left menu, click <strong>Build ➔ Firestore Database</strong> ➔ <strong>Create database</strong>.
                    In the <strong>Rules</strong> tab, set:
                    <pre className="p-2.5 mt-1.5 rounded-lg bg-black/60 text-gray-300 text-[11px] overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                    </pre>
                  </li>
                  <li>
                    Click the <strong>Gear icon ⚙️ ➔ Project settings ➔ Add Web App (&lt;/&gt;)</strong>, copy your keys into the form above, and click <strong>"Save & Connect"</strong>!
                  </li>
                </ol>
              </div>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Crumble Mobile App"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B] focus:ring-1 focus:ring-[#E65A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Subtitle / Role Line
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. FOOD DELIVERY APP — FULL SYSTEM"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B] focus:ring-1 focus:ring-[#E65A2B]"
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
                      placeholder="e.g. Mobile App / React Native"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B] focus:ring-1 focus:ring-[#E65A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Portfolio Section
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value as 'work' | 'lab')}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#222226] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                    >
                      <option value="work">Commercial Work / Live Projects</option>
                      <option value="lab">Lab / Concept / Experiments</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Description */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Description / Project Case Study
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you built, features, architecture, and impact..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#E65A2B] focus:ring-1 focus:ring-[#E65A2B]"
                  />
                </div>

                {/* Row 4: Main Media URL (Cloudinary / Image URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-gray-400 font-bold">
                      Primary Project Image URL (Cloudinary / Web) *
                    </label>
                    <a
                      href="https://cloudinary.com/console"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-[#FF7A45] hover:underline"
                    >
                      Open Cloudinary ↗
                    </a>
                  </div>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/your-cloud/image/upload/v12345/project.png"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#E65A2B]"
                  />
                  {mediaUrl && (
                    <div className="mt-2.5 w-full h-32 rounded-xl bg-black/50 border border-white/10 overflow-hidden relative">
                      <img
                        src={mediaUrl}
                        alt="Primary Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-white">
                        Primary Cover Image Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Row 5: Gallery Images */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Additional Gallery Images (Cloudinary Screenshots)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="url"
                      value={newGalleryInput}
                      onChange={(e) => setNewGalleryInput(e.target.value)}
                      placeholder="Paste additional Cloudinary image link..."
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="px-4 py-2 bg-white/10 hover:bg-[#E65A2B] text-white text-xs font-bold rounded-xl transition-all"
                    >
                      + Add Image
                    </button>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          className="relative h-20 rounded-xl overflow-hidden bg-black/60 border border-white/10 group"
                        >
                          <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(i)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 6: Tech Stack Tags */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Tech Stack & Tags
                  </label>
                  <div className="flex gap-2 mb-2.5">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTechTag(techInput);
                        }
                      }}
                      placeholder="Type a skill and press Enter (or click quick tags below)..."
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTechTag(techInput)}
                      className="px-4 py-2 bg-white/10 hover:bg-[#E65A2B] text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Add Tag
                    </button>
                  </div>

                  {/* Active Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {techList.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-[#E65A2B]/15 text-[#FF7A45] border border-[#E65A2B]/30 text-xs font-mono flex items-center gap-1.5"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechTag(t)}
                          className="hover:text-white font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Quick Select Preset Skills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-gray-400 font-mono self-center mr-1">
                      Quick Add:
                    </span>
                    {QUICK_SKILLS.filter((s) => !techList.includes(s))
                      .slice(0, 10)
                      .map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => handleAddTechTag(s)}
                          className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[11px] font-mono text-gray-300 transition-colors"
                        >
                          +{s}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Row 7: Live & Source Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      Live App / Demo / Figma URL
                    </label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://example.com or Figma link"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                      GitHub Source URL
                    </label>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://github.com/AnieX9009/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                </div>

                {/* Row 8: Card Accent Color */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-bold">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      {PRESET_COLORS.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setAccentColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            accentColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-orange-600/30"
                  >
                    {editingProjectId ? 'Save Changes' : 'Create Project'}
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
                    {editingExpIndex !== null ? 'Edit Experience Dossier' : 'Add New Work Experience'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Add or update your work experience, company, and key responsibility bullet points.
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
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                      Job Role *
                    </label>
                    <input
                      type="text"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      placeholder="e.g. FULL STACK DEVELOPER"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={expCompany}
                      onChange={(e) => setExpCompany(e.target.value)}
                      placeholder="e.g. LUX INDUSTRIES LIMITED"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                      Period / Dates
                    </label>
                    <input
                      type="text"
                      value={expPeriod}
                      onChange={(e) => setExpPeriod(e.target.value)}
                      placeholder="e.g. 11/2025 to Current"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                      Location
                    </label>
                    <input
                      type="text"
                      value={expLocation}
                      onChange={(e) => setExpLocation(e.target.value)}
                      placeholder="e.g. Kolkata, India"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono uppercase text-gray-400 font-bold">
                      Key Highlights & Bullets
                    </label>
                    <button
                      type="button"
                      onClick={handleAddBulletRow}
                      className="text-xs font-mono text-[#FF7A45] hover:underline"
                    >
                      + Add Bullet
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {expBullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start">
                        <span className="text-xs font-mono text-gray-500 pt-2.5 shrink-0">
                          {bIdx + 1}.
                        </span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleUpdateBulletRow(e.target.value, bIdx)}
                          placeholder="Describe key achievement, technology used, or metrics delivered..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#E65A2B]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBulletRow(bIdx)}
                          className="p-2 text-gray-400 hover:text-red-400 text-xs"
                          title="Remove Bullet"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsExpEditorOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E65A2B] to-[#FF7A45] hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-orange-600/30"
                  >
                    {editingExpIndex !== null ? 'Save Dossier' : 'Create Dossier'}
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
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#18181B] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">Export TypeScript Code</h3>
                  <p className="text-xs text-gray-400">
                    Copy and paste into <code className="text-[#FF7A45]">src/data/portfolio.ts</code> anytime you want to commit your edits into the repository git history.
                  </p>
                </div>
                <button
                  onClick={() => setIsExportOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Subtabs: Projects vs Experiences */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setExportTab('projects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                    exportTab === 'projects'
                      ? 'bg-[#E65A2B] text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  projectsData ({projects.length})
                </button>
                <button
                  onClick={() => setExportTab('experiences')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                    exportTab === 'experiences'
                      ? 'bg-[#E65A2B] text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  experiencesData ({experiences.length})
                </button>
              </div>

              {/* Code Viewer */}
              <div className="flex-1 bg-black/70 rounded-2xl p-4 border border-white/10 overflow-auto max-h-[50vh] font-mono text-xs text-gray-200">
                <pre>{getActiveExportCode()}</pre>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  onClick={handleDownloadCode}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10 flex items-center gap-1.5"
                >
                  <span>💾</span> Download .ts
                </button>
                <button
                  onClick={handleCopyExportCode}
                  className="px-5 py-2.5 rounded-xl bg-[#E65A2B] hover:bg-[#ff6937] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/30 flex items-center gap-1.5"
                >
                  <span>{copiedExport ? '✓ Copied!' : '📋 Copy to Clipboard'}</span>
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
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Change Admin Passcode</h3>
                  <p className="text-xs text-gray-400">
                    Default is <code className="text-[#FF7A45]">admin2026</code>
                  </p>
                </div>
                <button
                  onClick={() => setIsChangePinOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    value={oldPin}
                    onChange={(e) => setOldPin(e.target.value)}
                    required
                    placeholder="Enter old passcode"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-1 font-bold">
                    New Passcode (min 4 characters)
                  </label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    required
                    placeholder="Enter new passcode"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#E65A2B]"
                  />
                </div>

                {pinChangeMsg && (
                  <p
                    className={`text-xs font-mono ${
                      pinChangeMsg.isError ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {pinChangeMsg.text}
                  </p>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsChangePinOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E65A2B] text-white font-bold text-xs uppercase"
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
