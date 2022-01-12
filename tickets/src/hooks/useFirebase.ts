import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getFromLocalStorage, transformTicket } from '../utils/utils';
import { auth, getTicketCollectionQuery } from '../firebase/firebase';

export default function useFirebase() {
  const location = useLocation();
  const [params, setParams] = useState({});
  const [ticketsQuery, setTicketsQuery] = useState(null);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] =
    useCollectionData(
      ticketsQuery,
      { transform: transformTicket },
    );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(getFromLocalStorage('tickets-user'));

  useEffect(() => {
    if (!location.search) return;
    setParams(queryString.parse(location.search));
  }, [location]);

  useEffect(() => {
    setTicketsQuery(getTicketCollectionQuery(params));
  }, [params]);

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
