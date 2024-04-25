import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAEE2ui9cnlp4w4KRfH-hrtznQFzEA3rho",
authDomain: "retrospectively-d0cf2.firebaseapp.com",
projectId: "retrospectively-d0cf2",
storageBucket: "retrospectively-d0cf2.appspot.com",
messagingSenderId: "835565271045",
appId: "1:835565271045:web:8d34e7f46aceba20e6846c"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app);

export { db };