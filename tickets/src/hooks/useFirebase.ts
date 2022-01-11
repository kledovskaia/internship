import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, getTicketCollectionQuery } from '../firebase/firebase';

type TTime = {
  seconds: number,
  nanoseconds: number,
}
type TUntransformedTicket = TTicket & {
  createdAt: TTime,
  updatedAt: TTime,
}
type TTransform = (arg: TUntransformedTicket) => TTicket;

const transform: TTransform = ({ updatedAt, createdAt, ...doc }) => ({
  ...doc,
  ...(createdAt ?
    { createdAt: createdAt.seconds * 1000 + createdAt.nanoseconds / 1000 } :
    {}),
  ...(updatedAt ?
    { updatedAt: updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000 } :
    {}),
});

export default function useFirebase() {
  const [user, authLoading, authError] = useAuthState(auth);
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] =
    useCollectionData(
      getTicketCollectionQuery(),
      { transform },
    );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLoading(authLoading || ticketCollectionLoading);
  }, [authLoading, ticketCollectionLoading]);

  useEffect(() => {
    const newErrors = [authError, ticketCollectionError].filter(
      (error) => error,
    );
    setErrors((state) => [...state, ...newErrors]);
  }, [authError, ticketCollectionError]);

  return {
    errors,
    loading,
    user,
    ticketCollection,
  };
}
