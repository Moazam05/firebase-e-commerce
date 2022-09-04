// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDzj_5sFeMjFahOd5Ge779Q5cdggkNav8Y',
  authDomain: 'fir-commerce-2260b.firebaseapp.com',
  projectId: 'fir-commerce-2260b',
  storageBucket: 'fir-commerce-2260b.appspot.com',
  messagingSenderId: '965908208397',
  appId: '1:965908208397:web:cf6283ed819be376942e44',
  measurementId: 'G-W2ZG0P7TP7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase DB Setup
const firebaseDB = getFirestore(app);

export default firebaseDB;
