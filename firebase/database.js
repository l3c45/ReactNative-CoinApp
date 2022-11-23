import { db } from "./Config";
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteField,
  getDoc,
} from "firebase/firestore";

export const listener = (uid,callback) => {

  const ref = doc(db, "favorites", uid);
  const unsb = onSnapshot(ref, (doc) => {
    const favorites = doc.data();
   // console.log(favorites);
    callback(favorites)
  });
  return unsb;
};

export const deleteFromDB = async (item, uid) => {
  const cityRef = doc(db, "favorites", uid);
  try {
    //console.log("borrado")
    const remove = await updateDoc(cityRef, {
      [item]: deleteField(),
    });
  } catch (e) {
    console.log(e);
  }
};

export const saveInDB = async (item, uid) => {
  try {
    //console.log("creado")
    await setDoc(
      doc(db, "favorites", uid),
      {
        [item]: true,
      },
      { merge: true }
    );
  } catch (e) {
    console.log(e);
  }
};

export const getFromDBandSet = async (uid, item) => {
  const ref = doc(db, "favorites", uid);
  const docSnap = await getDoc(ref);

  const favorites = docSnap.data();

  if (docSnap.exists()) {
    
    if (favorites[item]) {
      deleteFromDB(item, uid);
    } else {
      saveInDB(item, uid);
    }
  } else {
    saveInDB(item, uid)
    console.log("No such document, create one!");
  }
};
