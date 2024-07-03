import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7aA8PSZUksWsiS1i5XJiIoWvBkV7aETE',
  authDomain: 'video-app-a5fee.firebaseapp.com',
  projectId: 'video-app-a5fee',
  storageBucket: 'video-app-a5fee.appspot.com',
  messagingSenderId: '1096028928781',
  appId: '1:1096028928781:web:b641cd79f871c1da090e44',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
