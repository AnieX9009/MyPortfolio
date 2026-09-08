import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectItem,
  projectsData as defaultProjects,
  ExperienceItem,
  experiencesData as defaultExperiences,
} from '../data/portfolio';

const STORAGE_PROJECTS_KEY = 'portfolio_custom_projects_v1';
const STORAGE_EXP_KEY = 'portfolio_custom_experiences_v1';
const ADMIN_PASSCODE_KEY = 'portfolio_admin_passcode_v1';
const DEFAULT_PASSCODE = 'admin2026';

interface ProjectContextType {
  // Projects
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => ProjectItem;
  updateProject: (id: string, updatedFields: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  resetToDefaults: () => void;
  exportProjectsCode: () => string;

  // Work Experiences
  experiences: ExperienceItem[];
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (index: number, updatedFields: Partial<ExperienceItem>) => void;
  deleteExperience: (index: number) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  resetExperiencesToDefaults: () => void;
  exportExperiencesCode: () => string;

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
  // ── Projects State ──
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

  // ── Experiences State ──
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

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_PROJECTS_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setProjects(updated);
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === STORAGE_EXP_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setExperiences(updated);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ── Project Handlers ──
  const addProject = (projectData: Omit<ProjectItem, 'id'>): ProjectItem => {
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

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updatedFields: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...updatedFields };
        if (!updated.images || updated.images.length === 0) {
          updated.images = [updated.mediaUrl];
        }
        return updated;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setProjects((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
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
  const addExperience = (exp: ExperienceItem) => {
    setExperiences((prev) => [exp, ...prev]);
  };

  const updateExperience = (index: number, updatedFields: Partial<ExperienceItem>) => {
    setExperiences((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, idx) => idx !== index));
  };

  const reorderExperiences = (startIndex: number, endIndex: number) => {
    setExperiences((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
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
