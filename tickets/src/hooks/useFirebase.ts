import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useLocation } from 'react-router-dom';
import { transformTicket } from '../utils/utils';
import { auth, getTicketCollectionQuery } from '../firebase/firebase';

export default function useFirebase() {
  const location = useLocation();
  const [user, authLoading, authError] = useAuthState(auth);
  const [ticketsQuery, setTicketsQuery] = useState(null);
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] =
    useCollectionData(
      ticketsQuery,
      { transform: transformTicket },
    );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getTicketCollectionQuery();
  }, [location]);

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
