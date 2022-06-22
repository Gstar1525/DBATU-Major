import { getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { API_URL } from "./apiConfig";
import {
    auth,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    updateUserProfile,
} from "./firebase-service";

import { createUser } from "./users";

export const fetchData = async (routes) => {
    const res = await fetch(API_URL + routes)
    return res.json()
}

export const login = async (event) => {
    event.preventDefault();
    const [email, password] = event.target;
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    if (userCredential.user) {
        return true
    }
    return false
}

export const authWithGoogle = async (signUp) => {
    const googleProvider = new GoogleAuthProvider();
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        await createUser(user.uid, true);
        return true
    } catch (err) {
        console.log("err");
        console.error(err);
        alert(err.message);
        return false
    }
}

export const signup = async (event) => {
    event.preventDefault();
    const [email, password] = event.target;
    const userCredential = await signUpWithEmailAndPassword(auth, email.value, password.value);
    if (auth.currentUser) {
        const uid = userCredential.user.uid;
        console.log(event.target.displayName.value);
        await updateUserProfile(userCredential.user, {
            displayName: event.target.displayName.value
        });
        
        const user = await createUser(uid, true);
        return true
    }
    return false
}

export const getCurrentUser = () => {
    return auth.currentUser;
}

export const getAuth = () => {
    return auth;
}