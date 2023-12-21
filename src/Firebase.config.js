// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCmE30qsQNj78aCQkTa-FI71wF7F94yCE",
    authDomain: "task-management-abd3c.firebaseapp.com",
    projectId: "task-management-abd3c",
    storageBucket: "task-management-abd3c.appspot.com",
    messagingSenderId: "164159897271",
    appId: "1:164159897271:web:d9adbc6a57acd7ff825732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;