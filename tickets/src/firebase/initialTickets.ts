import { serverTimestamp } from 'firebase/firestore';

const initialTickets = [
  {
    title: '',
    description: '',
    priority: 'high',
    author: {},
    completed: false,
    createdAt: serverTimestamp(),
  },
];

export default initialTickets;
