import { serverTimestamp } from "firebase/firestore";

export const initialTickets = [
  {
    title: '',
    description: '',
    priority: 'high',
    author: {},
    completed: false,
    createdAt: serverTimestamp(),
  }
]