import { addDoc } from 'firebase/firestore';
import { ticketsRef } from './firebase';
import { initialTickets } from './initialTickets';

export const seed = () => {
  initialTickets.forEach(ticket => {
    addDoc(ticketsRef, ticket)
  })
}