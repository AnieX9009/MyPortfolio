import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  ProjectItem,
  projectsData as defaultProjects,
  ExperienceItem,
  experiencesData as defaultExperiences,
} from '../data/portfolio';
import {
  getActiveFirebaseConfig,
  saveFirebaseConfigToStorage,
  clearFirebaseConfigFromStorage,
  resetFirebaseInstance,
  testFirebaseConnection,
  FirebaseConfig,
} from '../services/firebase';
import {
  fetchProjectsFromFirestore,
  fetchExperiencesFromFirestore,
  saveProjectToFirestore,
  updateProjectInFirestore,
  deleteProjectFromFirestore,
  reorderProjectsInFirestore,
  saveExperiencesToFirestore,
  seedInitialDataToFirestore,
  subscribeToProjects,
  subscribeToExperiences,
} from '../services/portfolioDb';

const STORAGE_PROJECTS_KEY = 'portfolio_custom_projects_v1';
const STORAGE_EXP_KEY = 'portfolio_custom_experiences_v1';
const ADMIN_PASSCODE_KEY = 'portfolio_admin_passcode_v1';
const DEFAULT_PASSCODE = 'admin2026';

export interface DbStatusInfo {
  isConfigured: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  mode: 'cloud' | 'local';
}

interface ProjectContextType {
  // Projects
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<ProjectItem>;
  updateProject: (id: string, updatedFields: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (startIndex: number, endIndex: number) => Promise<void>;
  resetToDefaults: () => void;
  exportProjectsCode: () => string;

  // Work Experiences
  experiences: ExperienceItem[];
  addExperience: (exp: ExperienceItem) => Promise<void>;
  updateExperience: (index: number, updatedFields: Partial<ExperienceItem>) => Promise<void>;
  deleteExperience: (index: number) => Promise<void>;
  reorderExperiences: (startIndex: number, endIndex: number) => Promise<void>;
  resetExperiencesToDefaults: () => void;
  exportExperiencesCode: () => string;

  // Cloud Database Status & Configuration
  dbStatus: DbStatusInfo;
  saveDbCredentials: (config: FirebaseConfig) => Promise<{ success: boolean; message: string }>;
  disconnectDb: () => void;
  seedInitialData: () => Promise<{ success: boolean; message: string; projectCount?: number; experienceCount?: number }>;
  refreshCloudData: () => Promise<void>;

  // Auth & Routing
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (oldPass: string, newPass: string) => boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Projects State (initialized from localStorage with fallback to default data) ──
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load projects from localStorage', e);
    }
    return defaultProjects;
  });

  // ── Experiences State (initialized from localStorage with fallback to default data) ──
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load experiences from localStorage', e);
    }
    return defaultExperiences;
  });

  // ── Cloud Database State ──
  const [dbStatus, setDbStatus] = useState<DbStatusInfo>(() => ({
    isConfigured: getActiveFirebaseConfig() !== null,
    isConnected: false,
    isLoading: true,
    error: null,
    mode: getActiveFirebaseConfig() !== null ? 'cloud' : 'local',
  }));

  // ── Admin Modal & Auth State ──
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/admin' || path === '/admin/' || hash === '#admin';
    }
    return false;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });

  const isInitialSyncDone = useRef(false);

  // ── Cloud DB Initial Fetch & Real-time Subscription ──
  const initCloudData = useCallback(async () => {
    const config = getActiveFirebaseConfig();
    if (!config) {
      setDbStatus({
        isConfigured: false,
        isConnected: false,
        isLoading: false,
        error: null,
        mode: 'local',
      });
      return;
    }

    setDbStatus((prev) => ({ ...prev, isLoading: true, isConfigured: true }));

    try {
      const [cloudProjects, cloudExperiences] = await Promise.all([
        fetchProjectsFromFirestore(),
        fetchExperiencesFromFirestore(),
      ]);

      if (cloudProjects && cloudProjects.length > 0) {
        setProjects(cloudProjects);
        localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(cloudProjects));
      }

      if (cloudExperiences && cloudExperiences.length > 0) {
        setExperiences(cloudExperiences);
        localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(cloudExperiences));
      }

      setDbStatus({
        isConfigured: true,
        isConnected: true,
        isLoading: false,
        error: null,
        mode: 'cloud',
      });
    } catch (error: any) {
      console.warn('Firestore initial load error (using cached local data):', error);
      setDbStatus({
        isConfigured: true,
        isConnected: false,
        isLoading: false,
        error: error?.message || 'Failed to connect to Firestore',
        mode: 'local',
      });
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!isInitialSyncDone.current) {
      isInitialSyncDone.current = true;
      initCloudData();
    }
  }, [initCloudData]);

  // Set up real-time Firestore listeners if connected
  useEffect(() => {
    if (!dbStatus.isConfigured) return;

    const unsubProjects = subscribeToProjects(
      (newProjects) => {
        if (newProjects && newProjects.length > 0) {
          setProjects(newProjects);
          localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(newProjects));
        }
      },
      (err) => console.warn('Projects real-time listener error:', err)
    );

    const unsubExp = subscribeToExperiences(
      (newExp) => {
        if (newExp && newExp.length > 0) {
          setExperiences(newExp);
          localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(newExp));
        }
      },
      (err) => console.warn('Experiences real-time listener error:', err)
    );

    return () => {
      if (unsubProjects) unsubProjects();
      if (unsubExp) unsubExp();
    };
  }, [dbStatus.isConfigured]);

  // Listen for browser navigation (back/forward or direct URL change)
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminOpen(path === '/admin' || path === '/admin/' || hash === '#admin');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Synchronize browser URL bar with admin modal open/close
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (isAdminOpen) {
      if (path !== '/admin' && path !== '/admin/') {
        window.history.pushState({ admin: true }, '', '/admin');
      }
    } else {
      if (path === '/admin' || path === '/admin/' || window.location.hash === '#admin') {
        window.history.pushState({ admin: false }, '', '/');
      }
    }
  }, [isAdminOpen]);

  // Save projects to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  // Save experiences to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EXP_KEY, JSON.stringify(experiences));
    } catch (e) {
      console.error('Failed to save experiences to localStorage', e);
    }
  }, [experiences]);

  // ── Database Configuration Handlers ──
  const saveDbCredentials = async (
    config: FirebaseConfig
  ): Promise<{ success: boolean; message: string }> => {
    const testResult = await testFirebaseConnection(config);
    if (!testResult.success) {
      return testResult;
    }

    saveFirebaseConfigToStorage(config);
    resetFirebaseInstance();
    await initCloudData();

    return {
      success: true,
      message: 'Connected to Firestore! Database is ready for live synchronization.',
    };
  };

  const disconnectDb = () => {
    clearFirebaseConfigFromStorage();
    resetFirebaseInstance();
    setDbStatus({
      isConfigured: false,
      isConnected: false,
      isLoading: false,
      error: null,
      mode: 'local',
    });
  };

  const seedInitialData = async (): Promise<{
    success: boolean;
    message: string;
    projectCount?: number;
    experienceCount?: number;
  }> => {
    try {
      const res = await seedInitialDataToFirestore(projects, experiences);
      setDbStatus((prev) => ({ ...prev, isConnected: true, error: null }));
      return {
        success: true,
        message: `Successfully seeded ${res.projectCount} projects and ${res.experienceCount} work experiences to Firestore!`,
        projectCount: res.projectCount,
        experienceCount: res.experienceCount,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Failed to seed data to Firestore.',
      };
    }
  };

  const refreshCloudData = async () => {
    await initCloudData();
  };

  // ── Project Handlers ──
  const addProject = async (projectData: Omit<ProjectItem, 'id'>): Promise<ProjectItem> => {
    const newId =
      projectData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `project-${Date.now()}`;

    let uniqueId = newId;
    let counter = 1;
    while (projects.some((p) => p.id === uniqueId)) {
      uniqueId = `${newId}-${counter++}`;
    }

    const newProject: ProjectItem = {
      ...projectData,
      id: uniqueId,
      images:
        projectData.images && projectData.images.length > 0
          ? projectData.images
          : [projectData.mediaUrl],
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);

    // Save to Firestore in background if configured
    try {
      await saveProjectToFirestore(newProject, 0);
      await reorderProjectsInFirestore(updatedProjects);
    } catch (e) {
      console.warn('Could not sync new project to Firestore:', e);
    }

    return newProject;
  };

  const updateProject = async (id: string, updatedFields: Partial<ProjectItem>) => {
    const updatedProjects = projects.map((item) => {
      if (item.id !== id) return item;
      const updated = { ...item, ...updatedFields };
      if (!updated.images || updated.images.length === 0) {
        updated.images = [updated.mediaUrl];
      }
      return updated;
    });

    setProjects(updatedProjects);

    // Save to Firestore in background if configured
    try {
      await updateProjectInFirestore(id, updatedFields);
    } catch (e) {
      console.warn('Could not sync project update to Firestore:', e);
    }
  };

  const deleteProject = async (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);

    // Save to Firestore in background if configured
    try {
      await deleteProjectFromFirestore(id);
    } catch (e) {
      console.warn('Could not sync project delete to Firestore:', e);
    }
  };

  const reorderProjects = async (startIndex: number, endIndex: number) => {
    const result = Array.from(projects);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setProjects(result);

    // Save order to Firestore in background if configured
    try {
      await reorderProjectsInFirestore(result);
    } catch (e) {
      console.warn('Could not sync reordered projects to Firestore:', e);
    }
  };

  const resetToDefaults = () => {
    setProjects(defaultProjects);
    try {
      localStorage.removeItem(STORAGE_PROJECTS_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportProjectsCode = (): string => {
    const jsonFormatted = JSON.stringify(projects, null, 2);
    return `export const projectsData: ProjectItem[] = ${jsonFormatted};`;
  };

  // ── Experience Handlers ──
  const addExperience = async (exp: ExperienceItem) => {
    const updatedExperiences = [exp, ...experiences];
    setExperiences(updatedExperiences);

    try {
      await saveExperiencesToFirestore(updatedExperiences);
    } catch (e) {
      console.warn('Could not sync experiences to Firestore:', e);
    }
  };

  const updateExperience = async (index: number, updatedFields: Partial<ExperienceItem>) => {
    const updatedExperiences = experiences.map((item, idx) =>
      idx === index ? { ...item, ...updatedFields } : item
    );
    setExperiences(updatedExperiences);

    try {
      await saveExperiencesToFirestore(updatedExperiences);
    } catch (e) {
      console.warn('Could not sync experiences to Firestore:', e);
    }
  };

  const deleteExperience = async (index: number) => {
    const updatedExperiences = experiences.filter((_, idx) => idx !== index);
    setExperiences(updatedExperiences);

    try {
      await saveExperiencesToFirestore(updatedExperiences);
    } catch (e) {
      console.warn('Could not sync experiences to Firestore:', e);
    }
  };

  const reorderExperiences = async (startIndex: number, endIndex: number) => {
    const result = Array.from(experiences);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setExperiences(result);

    try {
      await saveExperiencesToFirestore(result);
    } catch (e) {
      console.warn('Could not sync experiences to Firestore:', e);
    }
  };

  const resetExperiencesToDefaults = () => {
    setExperiences(defaultExperiences);
    try {
      localStorage.removeItem(STORAGE_EXP_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportExperiencesCode = (): string => {
    const jsonFormatted = JSON.stringify(experiences, null, 2);
    return `export const experiencesData: ExperienceItem[] = ${jsonFormatted};`;
  };

  // ── Auth Handlers ──
  const loginAdmin = (passcode: string): boolean => {
    const currentPasscode = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (passcode === currentPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  const changeAdminPasscode = (oldPass: string, newPass: string): boolean => {
    const currentPasscode = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (oldPass === currentPasscode && newPass.trim().length >= 4) {
      localStorage.setItem(ADMIN_PASSCODE_KEY, newPass.trim());
      return true;
    }
    return false;
  };

  return (
    <ProjectContext.Provider
      value={{
        // Projects
        projects,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        resetToDefaults,
        exportProjectsCode,

        // Experiences
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        resetExperiencesToDefaults,
        exportExperiencesCode,

        // Cloud Database Status & Config
        dbStatus,
        saveDbCredentials,
        disconnectDb,
        seedInitialData,
        refreshCloudData,

        // Auth & Routing
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
