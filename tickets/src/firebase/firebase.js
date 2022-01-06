import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, query, doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';
import { seed } from './seed'
import { nanoid } from 'nanoid';

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
export const ticketsRef = collection(db, "tickets");
export const getTicketCollectionQuery = () => query(ticketsRef);
export const getTicketQuery = (id) => id ? doc(ticketsRef, id) : null;

const AuthProvider = new GoogleAuthProvider();
export const login =  () => signInWithPopup(auth, AuthProvider);

export const logout = () => {
  signOut(auth)
};

// seed();

export const addTicketFirebase = (ticket, author) => {
  const id = nanoid();
  return setDoc(doc(db, "tickets", id), { 
    ...ticket, 
    id,
    author,
    completed: false,
    createdAt: serverTimestamp(), 
  })
}
export const updateTicketFirebase = (ticket) => {
  return setDoc(doc(db, "tickets", ticket.id), {
    ...ticket,
    updatedAt: serverTimestamp(),
  }, { merge: true })
}
export const deleteTicketFirebase = (ticketId) => {
  return deleteDoc(doc(db, "tickets", ticketId))
}
export const getTicketFirebase = async (ticketId) => {
  const ticketDoc = await getDoc(doc(db, "tickets", ticketId))
  if (!ticketDoc.exists()) throw new Error('Ticket doesn\'t exist');
  return ticketDoc.data()
}