import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, query, doc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';
import { seed } from './seed'

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const ticketsRef = collection(db, "tickets");
export const getTicketCollectionQuery = () => query(ticketsRef);
export const getTicketQuery = (id) => id ? doc(ticketsRef, id) : null;

export const login = () => signInWithPopup(auth, GoogleAuthProvider);

export const logout = () => {
  signOut(auth)
};

seed(app);