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
  serverTimestamp,
  limit,
  orderBy,
  startAfter,
  endBefore,
  limitToLast,
  DocumentData,
  where,
  FieldPath,
  updateDoc,
  FieldValue,
  increment,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { nanoid } from 'nanoid';
import firebaseConfig from './config';
// import { seed } from './seed'

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
export const ticketsRef = collection(db, 'tickets');

type TGetTicketCollectionQuery = (
  params?: TQueryParams
) => void

export const getTicketCollectionQuery: TGetTicketCollectionQuery = (params) => {
  if (!Object.keys(params).length) {
    return query(
      ticketsRef,
    );
  }
  return query(
    ticketsRef,
    orderBy('createdAt'),
  );

  // !!!!!
  // firebase v.8.X.X
  // .firestore().collection('items')
  // .limit(L)
  // .offset(O)
  // .get()

  // Actually fetches O + L documents
  // I could use pointers, but it wouldn't work with links
  // I think it's better to use mongodb in this case
};

const AuthProvider = new GoogleAuthProvider();
export const loginFirebase = () => signInWithPopup(auth, AuthProvider);

export const logoutFirebase = () => {
  signOut(auth);
};

// seed();

const getUser = () => getAuth().currentUser;

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

export const addTicketFirebase = (ticket: Partial<TTicket>) => {
  const user = getUser();
  const author = {
    photoURL: user.photoURL,
    displayName: user.displayName,
    id: user.uid,
  };

  const id = nanoid();
  return setDoc(doc(db, 'tickets', id), {
    ...ticket,
    id,
    author,
    completed: false,
    createdAt: serverTimestamp(),
  });
};
export const updateTicketFirebase = async (ticket: Partial<TTicket>) => {
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  return setDoc(doc(db, 'tickets', ticket.id), {
    ...ticket,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};
export const deleteTicketFirebase = async (ticket: TTicket) => {
  await checkTicketExistance(ticket.id);
  await checkPermissonToModify(ticket.author.id);

  return deleteDoc(doc(db, 'tickets', ticket.id));
};

export const updateTicketsCountFirebase = async (value: number) => setDoc(doc(db, 'counters', 'tickets'), {
  value: increment(value),
}, { merge: true });
