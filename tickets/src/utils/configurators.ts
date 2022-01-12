import { nanoid } from '@reduxjs/toolkit';
import { getUser } from '../firebase/firebase';

export const configTicketObj = (ticket: Partial<TTicket>) => {
  const user = getUser();
  const author = {
    photoURL: user.photoURL,
    displayName: user.displayName,
    id: user.uid,
  };

  const id = nanoid();
  const ticketObj = {
    ...ticket,
    id,
    author,
    completed: false,
    // Here was a problem with serverTimestamp
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return ticketObj;
};
