// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlpxkhXpJqxKjdJ4YUnZ4lf9LaMhidpS8",
  authDomain: "knguru-4cd17.firebaseapp.com",
  projectId: "knguru-4cd17",
  storageBucket: "knguru-4cd17.firebasestorage.app",
  messagingSenderId: "830899972117",
  appId: "1:830899972117:web:63e393e9cab363d185061c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//IOS 620102760932-905tivopfp46bgjobn3prl5kifgv55qf.apps.googleusercontent.com

// android 620102760932-9jmqfliqbs5bjli6d6272j9crt6bdsg0.apps.googleusercontent.com
