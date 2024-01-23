import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBmWlDf_kMCCHNj-o7VRpgaARpjRzP4FTU",
  authDomain: "dress-sense-db.firebaseapp.com",
  projectId: "dress-sense-db",
  storageBucket: "dress-sense-db.appspot.com",
  messagingSenderId: "245448399949",
  appId: "1:245448399949:web:e9146f9657c2e57a5e5004",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
}