import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, getDocs, limit, query } from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_CONFIG_KEY = 'portfolio_firebase_config_v1';

/**
 * Retrieves the Firebase configuration from environment variables or localStorage.
 */
export const getActiveFirebaseConfig = (): FirebaseConfig | null => {
  // 1. Check environment variables first (Vite import.meta.env)
  const envConfig: Partial<FirebaseConfig> = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  if (envConfig.apiKey && envConfig.projectId && envConfig.appId) {
    return envConfig as FirebaseConfig;
  }

  // 2. Check localStorage for user-configured credentials from Admin Panel
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId && parsed.appId) {
        return parsed as FirebaseConfig;
      }
    }
  } catch (e) {
    console.error('Failed to read Firebase config from localStorage', e);
  }

  return null;
};

/**
 * Save Firebase configuration to localStorage from Admin Panel
 */
export const saveFirebaseConfigToStorage = (config: FirebaseConfig): void => {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
};

/**
 * Remove Firebase configuration from localStorage
 */
export const clearFirebaseConfigFromStorage = (): void => {
  localStorage.removeItem(STORAGE_CONFIG_KEY);
};

let cachedDb: Firestore | null = null;
let cachedApp: FirebaseApp | null = null;

/**
 * Get or initialize the Firebase App and Firestore instance.
 */
export const getFirebaseDb = (): Firestore | null => {
  const config = getActiveFirebaseConfig();
  if (!config) {
    return null;
  }

  try {
    if (!cachedApp) {
      if (getApps().length > 0) {
        cachedApp = getApp();
      } else {
        cachedApp = initializeApp(config);
      }
    }
    if (!cachedDb && cachedApp) {
      cachedDb = getFirestore(cachedApp);
    }
    return cachedDb;
  } catch (err) {
    console.error('Error initializing Firebase / Firestore:', err);
    return null;
  }
};

/**
 * Re-initializes Firebase with new credentials (e.g. after user updates admin settings).
 */
export const resetFirebaseInstance = (): Firestore | null => {
  cachedApp = null;
  cachedDb = null;
  return getFirebaseDb();
};

/**
 * Checks if Firebase credentials are present.
 */
export const isFirebaseConfigured = (): boolean => {
  return getActiveFirebaseConfig() !== null;
};

/**
 * Tests connection to Firestore by attempting a small read.
 */
export const testFirebaseConnection = async (customConfig?: FirebaseConfig): Promise<{ success: boolean; message: string }> => {
  try {
    const configToTest = customConfig || getActiveFirebaseConfig();
    if (!configToTest || !configToTest.apiKey || !configToTest.projectId) {
      return {
        success: false,
        message: 'Missing Firebase configuration. Please provide API Key, Project ID, and App ID.',
      };
    }

    // Temporary app for testing custom config
    const testAppName = `test-app-${Date.now()}`;
    const testApp = initializeApp(configToTest, testAppName);
    const testDb = getFirestore(testApp);

    // Try a simple query on 'projects' collection
    const projectsCol = collection(testDb, 'projects');
    const q = query(projectsCol, limit(1));
    await getDocs(q);

    return {
      success: true,
      message: 'Successfully connected to Firebase Firestore!',
    };
  } catch (error: any) {
    console.error('Firebase test connection failed:', error);
    let errorMsg = error?.message || 'Failed to connect to Firebase Firestore.';
    if (error?.code === 'permission-denied') {
      errorMsg = 'Permission Denied: Please update your Firestore Security Rules to allow read/write.';
    }
    return {
      success: false,
      message: errorMsg,
    };
  }
};
