import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, query, doc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const ticketsRef = collection(db, "tickets");
export const getTicketCollectionQuery = () => query(ticketsRef);
export const getTicketQuery = (id) => doc(ticketsRef, id);

export const login = () => signInWithPopup(auth, GoogleAuthProvider);

export const logout = () => {
  signOut(auth)
};