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
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("session  "+uid)
     

    } else {
      console.log("no")
      
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
    console.log(create);
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
