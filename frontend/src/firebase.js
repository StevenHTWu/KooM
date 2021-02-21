import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCgrlfcn6M8VlXbeLCJda0qAhx9Y2FdFw0",
  authDomain: "sdhack2021.firebaseapp.com",
  projectId: "sdhack2021",
  storageBucket: "sdhack2021.appspot.com",
  messagingSenderId: "759752214510",
  appId: "1:759752214510:web:faaf5971e34ec7f0a2b0ff",
  measurementId: "G-BXJF7ESD7V",
});

export const auth = app.auth();
export default app;
