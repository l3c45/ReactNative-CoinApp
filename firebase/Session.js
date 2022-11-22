import {
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./Config";



export const isLogged=  () =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("session  "+user.uid)

    } 
  });
}




export const saveNewUser = async (user) => {
  try {
    const create = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return true;
    
  } catch {
    (e) => console.log(e);
  }
};

export const loginUser = async (user) => {
  try {
    const signIn = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return false
};

export const signOutUser = async () => {
  try {
    const logout = await signOut(auth);
    return true;
  } catch {
    (e) => console.log(e);
  }
};

export const resetPassword = (user) => {
  try {
    const reset = sendPasswordResetEmail(auth, user.email);
  } catch {
    (e) => console.log(e);
  }
};
