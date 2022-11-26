import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwNye8Ip0Y-ipOFAh5Nt0XQ-WdZW63BO8",
  authDomain: "clothshop-407d1.firebaseapp.com",
  projectId: "clothshop-407d1",
  storageBucket: "clothshop-407d1.appspot.com",
  messagingSenderId: "468867809643",
  appId: "1:468867809643:web:a4d8f722cb390e53654c2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        
        localStorage.setItem("googleName", name);
        localStorage.setItem("googleEmail", email);
    })
    .catch((error) => {
        console.log(error);
    });
};