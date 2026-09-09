# 🚀 Free Cloud Database (Firebase Firestore) Setup Guide

This portfolio includes full cloud database synchronization powered by **Google Firebase Firestore** (100% Free forever on the Spark Plan).

---

## ⏱️ Quick 3-Minute Setup

### Step 1: Create a Free Firebase Project
1. Open the [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click **"Add project"** (or "Create a project").
3. Give your project a name (e.g. `animesh-portfolio` or `sandip-portfolio`) and click **Continue**.
4. Disable Google Analytics (optional, not required) and click **Create project**.

---

### Step 2: Create a Cloud Firestore Database
1. In the left sidebar of your Firebase Console, click on **Build** ➔ **Firestore Database**.
2. Click **"Create database"**.
3. Choose a location closest to your target audience (e.g., `asia-south1` or `us-central1`).
4. Select **"Start in test mode"** (or click Next).
5. Go to the **Rules** tab inside Firestore and update your rules to allow read and write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
6. Click **Publish**.

---

### Step 3: Get Your Web App Config
1. In your Firebase Console, click the ⚙️ **Gear Icon** next to **Project Overview** in the left sidebar and choose **Project settings**.
2. Scroll down to the **"Your apps"** section and click the **Web icon (`</>`)**.
3. Register your app (e.g. name it `Portfolio-Web`) and click **Register app**.
4. You will see your `firebaseConfig` object:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "portfolio.firebaseapp.com",
  projectId: "portfolio-...",
  storageBucket: "portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

### Step 4: Connect it to Your Portfolio (2 Easy Ways)

#### 🔹 Option A: Directly from the Admin Panel (Fastest!)
1. Open your portfolio in any browser and open `/admin` (or click the floating Admin button).
2. Enter your admin PIN (default: `admin2026`).
3. Click on the **"Database"** tab at the top.
4. Paste your `API Key`, `Auth Domain`, `Project ID`, `Storage Bucket`, `Messaging Sender ID`, and `App ID`.
5. Click **"Save & Connect"**.
6. Once connected, click the **"⚡ 1-Click Seed Initial Data to Cloud"** button to instantly push all your current portfolio projects and work experiences to your Firestore database!

#### 🔹 Option B: Via Environment Variables (.env / Vercel / Netlify)
Add these variables in your `.env.local` file or in your Vercel Project Settings ➔ Environment Variables:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## 🎯 What Happens Next?
- **Real-Time Global Sync**: Any new project you add, edit, reorder, or delete in the Admin Panel is instantly saved to Google Cloud Firestore and shows up immediately for every visitor across the world!
- **Offline & Fallback Safety**: If the database is ever unreachable or offline, the site will automatically and safely fall back to the default portfolio data without any error screens.
