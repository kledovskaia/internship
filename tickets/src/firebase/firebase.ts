import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { configTicketObj } from '../utils/configurators';
import firebaseConfig from './config';
// import { seed } from './seed'

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
export const ticketsRef = collection(db, 'tickets');

export const TicketCollectionQuery = query(
  ticketsRef,
  orderBy('createdAt', 'desc'),
);

const AuthProvider = new GoogleAuthProvider();
export const loginFirebase = () => signInWithPopup(auth, AuthProvider);

export const logoutFirebase = () => {
  signOut(auth);
};

// seed();

export const getUser = () => getAuth().currentUser;

const getTicketFirebase = async (ticketId: TTicket['id']) => {
  const ticketDoc = await getDoc(doc(db, 'tickets', ticketId));
  if (!ticketDoc.exists()) throw new Error('Ticket doesn\'t exist');
  return ticketDoc.data();
};

const checkPermissonToModify = async (id: TTicket['id']) => {
  const user = getAuth().currentUser;
  const { uid } = user;
  if (id !== uid) throw new Error('You don\'t have permission to modify this ticket');
  return true;
};
const checkTicketExistance = async (id: TTicket['id']) => {
  await getTicketFirebase(id);
};

export const addTicketFirebase = async (ticket: Partial<TTicket>) => {
  const ticketObj = configTicketObj(ticket);
  await setDoc(doc(db, 'tickets', ticketObj.id), ticketObj);
  return ticketObj.id;
};
export const updateTicketFirebase = async (ticket: Partial<TTicket>) => {
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  await setDoc(doc(db, 'tickets', ticket.id), {
    ...ticket,
    updatedAt: Date.now(),
  }, { merge: true });
  return ticket.id;
};
export const deleteTicketFirebase = async (ticket: TTicket) => {
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  return deleteDoc(doc(db, 'tickets', ticket.id));
};
