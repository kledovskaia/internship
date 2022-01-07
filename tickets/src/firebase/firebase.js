import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, query, doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';
// import { seed } from './seed'
import { nanoid } from 'nanoid';

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
export const ticketsRef = collection(db, "tickets");
export const getTicketCollectionQuery = () => query(ticketsRef);

const AuthProvider = new GoogleAuthProvider();
export const loginFirebase =  () => signInWithPopup(auth, AuthProvider);

export const logoutFirebase = () => {
  signOut(auth)
};

// seed();

export const addTicketFirebase = (ticket) => {
  const user = getUser();
  checkAuthentication();
  const author = {
    photoURL:  user.photoURL,
    displayName: user.displayName,
    id: user.uid,
  }

  const id = nanoid();
  return setDoc(doc(db, "tickets", id), { 
    ...ticket, 
    id,
    author,
    completed: false,
    createdAt: serverTimestamp(), 
  })
}
export const updateTicketFirebase = async (ticket) => {
  checkAuthentication();
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.id);
      
  return await setDoc(doc(db, "tickets", ticket.id), {
    ...ticket,
    updatedAt: serverTimestamp(),
  }, { merge: true })
}
export const deleteTicketFirebase = async (ticketId) => {
  checkAuthentication();
  await checkTicketExistance(ticketId);
  await checkPermissonToModify(ticketId);

  return deleteDoc(doc(db, "tickets", ticketId));
}
const getTicketFirebase = async (ticketId) => {
  const ticketDoc = await getDoc(doc(db, "tickets", ticketId));
  if (!ticketDoc.exists()) throw new Error('Ticket doesn\'t exist');
  return ticketDoc.data();
}
const checkPermissonToModify = async (id) => {
  const idToken = await getAuth().currentUser.getIdToken(true);
  const decodedToken = await getAuth().verifyIdToken(idToken);
  const { uid } = decodedToken;
  if (id !== uid) throw new Error('You don\'t have permission to modify this ticket')
  return true;
}
const checkAuthentication = () => {
  const user = getUser();
  if (!user) throw new Error('Please authenticate to perform this action');
  return user;
}
const checkTicketExistance = async (id) => {
  await getTicketFirebase(id);
};
const getUser = () => getAuth().currentUser