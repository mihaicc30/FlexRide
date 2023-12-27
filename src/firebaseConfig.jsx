import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword
  // createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXEinEAaWT0ZurCxWlyjySY_veqQWQJHI",
  authDomain: "flexride-e5f09.firebaseapp.com",
  databaseURL:
    "https://flexride-e5f09-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flexride-e5f09",
  storageBucket: "flexride-e5f09.appspot.com",
  messagingSenderId: "81571276025",
  appId: "1:81571276025:web:878189430a9ae3f237ee28",
  measurementId: "G-M4NEXJ400R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logOut = () => {
  signOut(auth);
};

// const res = await createUserWithEmailAndPassword(auth, "test@user.com", "test@user.com");
// const user = res.user;
// await addDoc(collection(db, "riders"), {
//   name:"Test Rider",
//   username:"Test Rider",
//   uid: crypto.randomUUID(),
//   avatar: `https://randomuser.me/api/portraits/men/2.jpg`,
//   email:"test@user.com",
//   date: new Date(),
//   accountType:"riders"
// });

const googleProvider = new GoogleAuthProvider();

const logInWithEmailAndPassword = async () => {
  await signInWithEmailAndPassword(auth, "test@user.com", "test@user.com");
};

const signInWithGoogle = async (typeOfUser) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // Check if user exists in Firestore
    const q = query(
      collection(db, typeOfUser),
      where("email", "==", user.email)
    );
    const docs = await getDocs(q);
    if (docs.docs.length < 1) {
      // Add user to Firestore if not already exists
      const newUserRef = await addDoc(collection(db, typeOfUser), {
        uid: auth.currentUser.uid,
        accountType: typeOfUser,
        displayName: auth.currentUser.displayName,
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        avatar: auth.currentUser.photoURL || "",
        date: new Date().getTime(),
      });
      console.log(
        "User does not exists in Firestore. New user added with ID: ",
        newUserRef.uid
      );
    } else {
      console.log("User already exists in Firestore. No updates needed.");
    }
    console.log("Popup is successfull. Proceeding...");
  } catch (error) {
    if (error == "FirebaseError: Firebase: Error (auth/popup-closed-by-user).")
      console.log("User closed login popup.");
  }
};

export { app, auth, signInWithGoogle, logOut, logInWithEmailAndPassword };
