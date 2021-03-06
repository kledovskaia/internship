import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Query } from 'firebase/firestore';
import { getFromLocalStorage } from '../utils/utils';
import { auth, TicketCollectionQuery } from '../firebase/firebase';

export default function useFirebase() {
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [ticketsQuery, setTicketsQuery] = useState<Query>(null);
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] =
    useCollectionData(
      ticketsQuery,
    );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(getFromLocalStorage('tickets-user'));

  useEffect(() => {
    if (!authUser) {
      setTicketsQuery(null);
      return;
    }
    setTicketsQuery(TicketCollectionQuery);
  }, [authUser]);

  useEffect(() => {
    if (!authLoading) {
      setUser(authUser);
    }
  }, [authUser, authLoading]);

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
