import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import { ProjectItem, ExperienceItem } from '../data/portfolio';

export interface FirestoreProjectItem extends ProjectItem {
  orderIndex?: number;
  updatedAt?: number;
}

const PROJECTS_COLLECTION = 'projects';
const SETTINGS_COLLECTION = 'settings';
const EXPERIENCES_DOC = 'experiences';

/**
 * Fetch all projects from Firestore, sorted by order index.
 */
export const fetchProjectsFromFirestore = async (): Promise<ProjectItem[] | null> => {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const projectsCol = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsCol, orderBy('orderIndex', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Also try fetching without orderIndex in case legacy items exist
      const fallbackSnapshot = await getDocs(projectsCol);
      if (fallbackSnapshot.empty) return [];
      return fallbackSnapshot.docs.map((d) => d.data() as ProjectItem);
    }

    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: data.id || d.id,
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        category: data.category || '',
        tech: Array.isArray(data.tech) ? data.tech : [],
        type: data.type === 'lab' ? 'lab' : 'work',
        mediaUrl: data.mediaUrl || '',
        images: Array.isArray(data.images) ? data.images : data.mediaUrl ? [data.mediaUrl] : [],
        live: data.live || '',
        source: data.source || '',
        color: data.color || '#E65A2B',
      } as ProjectItem;
    });
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    throw error;
  }
};

/**
 * Fetch work experiences from Firestore.
 */
export const fetchExperiencesFromFirestore = async (): Promise<ExperienceItem[] | null> => {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const expDocRef = doc(db, SETTINGS_COLLECTION, EXPERIENCES_DOC);
    const expDoc = await getDoc(expDocRef);

    if (expDoc.exists()) {
      const data = expDoc.data();
      if (Array.isArray(data.list)) {
        return data.list as ExperienceItem[];
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching experiences from Firestore:', error);
    throw error;
  }
};

/**
 * Add or overwrite a single project in Firestore.
 */
export const saveProjectToFirestore = async (
  project: ProjectItem,
  orderIndex: number = 0
): Promise<void> => {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, project.id);
    await setDoc(docRef, {
      ...project,
      orderIndex,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error('Error saving project to Firestore:', error);
    throw error;
  }
};

/**
 * Update partial fields of a project in Firestore.
 */
export const updateProjectInFirestore = async (
  id: string,
  updatedFields: Partial<ProjectItem>
): Promise<void> => {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await setDoc(
      docRef,
      {
        ...updatedFields,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating project in Firestore:', error);
    throw error;
  }
};

/**
 * Delete a project from Firestore.
 */
export const deleteProjectFromFirestore = async (id: string): Promise<void> => {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting project from Firestore:', error);
    throw error;
  }
};

/**
 * Batch update orderIndex for an array of projects.
 */
export const reorderProjectsInFirestore = async (projects: ProjectItem[]): Promise<void> => {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const batch = writeBatch(db);
    projects.forEach((proj, idx) => {
      const docRef = doc(db, PROJECTS_COLLECTION, proj.id);
      batch.set(
        docRef,
        {
          ...proj,
          orderIndex: idx,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
    });
    await batch.commit();
  } catch (error) {
    console.error('Error reordering projects in Firestore:', error);
    throw error;
  }
};

/**
 * Save all work experiences in Firestore.
 */
export const saveExperiencesToFirestore = async (experiences: ExperienceItem[]): Promise<void> => {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, EXPERIENCES_DOC);
    await setDoc(docRef, {
      list: experiences,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error('Error saving experiences to Firestore:', error);
    throw error;
  }
};

/**
 * Seed initial portfolio data (all default projects & experiences) into Firestore in batch.
 */
export const seedInitialDataToFirestore = async (
  projects: ProjectItem[],
  experiences: ExperienceItem[]
): Promise<{ projectCount: number; experienceCount: number }> => {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not initialized.');
  }

  try {
    const batch = writeBatch(db);

    // Seed projects
    projects.forEach((proj, index) => {
      const projRef = doc(db, PROJECTS_COLLECTION, proj.id);
      batch.set(projRef, {
        ...proj,
        orderIndex: index,
        updatedAt: Date.now(),
      });
    });

    // Seed experiences
    const expRef = doc(db, SETTINGS_COLLECTION, EXPERIENCES_DOC);
    batch.set(expRef, {
      list: experiences,
      updatedAt: Date.now(),
    });

    await batch.commit();
    return {
      projectCount: projects.length,
      experienceCount: experiences.length,
    };
  } catch (error) {
    console.error('Error seeding data to Firestore:', error);
    throw error;
  }
};

/**
 * Real-time listener for Projects collection.
 */
export const subscribeToProjects = (
  onData: (projects: ProjectItem[]) => void,
  onError?: (error: Error) => void
): Unsubscribe | null => {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const projectsCol = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsCol, orderBy('orderIndex', 'asc'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: data.id || d.id,
              title: data.title || '',
              subtitle: data.subtitle || '',
              description: data.description || '',
              category: data.category || '',
              tech: Array.isArray(data.tech) ? data.tech : [],
              type: data.type === 'lab' ? 'lab' : 'work',
              mediaUrl: data.mediaUrl || '',
              images: Array.isArray(data.images) ? data.images : data.mediaUrl ? [data.mediaUrl] : [],
              live: data.live || '',
              source: data.source || '',
              color: data.color || '#E65A2B',
            } as ProjectItem;
          });
          onData(items);
        }
      },
      (err) => {
        console.error('Projects subscription error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.error('Failed to attach projects listener:', err);
    if (onError) onError(err);
    return null;
  }
};

/**
 * Real-time listener for Experiences doc.
 */
export const subscribeToExperiences = (
  onData: (experiences: ExperienceItem[]) => void,
  onError?: (error: Error) => void
): Unsubscribe | null => {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const expDocRef = doc(db, SETTINGS_COLLECTION, EXPERIENCES_DOC);

    return onSnapshot(
      expDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data.list) && data.list.length > 0) {
            onData(data.list as ExperienceItem[]);
          }
        }
      },
      (err) => {
        console.error('Experiences subscription error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.error('Failed to attach experiences listener:', err);
    if (onError) onError(err);
    return null;
  }
};
