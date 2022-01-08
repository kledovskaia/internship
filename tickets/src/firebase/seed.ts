import { addDoc } from 'firebase/firestore';
import { ticketsRef } from './firebase';
import initialTickets from './initialTickets';

const seed = () => {
  initialTickets.forEach((ticket) => {
    addDoc(ticketsRef, ticket);
  });
};

export default seed;
