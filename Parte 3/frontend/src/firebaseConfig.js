import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_API_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_API_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_API_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_API_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_API_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_API_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);