import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getFromLocalStorage, transformTicket } from '../utils/utils';
import { auth, getTicketCollectionQuery } from '../firebase/firebase';

// const pageSize = 3;
// const field = 'username';

// let query = (ref) => ref.orderBy(field).limit(pageSize);
// function nextPage(last) {
//   query = (ref) => ref.orderBy(field).startAfter(last[field]).limit(pageSize);
// }
// function prevPage(first) {
//   query = (ref) => ref.orderBy(field).endBefore(first[field]).limitToLast(pageSize);
// }
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
    console.log(ticketCollection);
  }, [ticketCollection]);

  useEffect(() => {
    if (!location.search) return;
    setParams((state) => ({ ...state, params: queryString.parse(location.search) }));
  }, [location]);

  const nextPage = () => setParams({
    params: queryString.parse(location.search),
    last: ticketCollection[ticketCollection.length - 1],
  });
  const prevPage = () => setParams({
    params: queryString.parse(location.search),
    first: ticketCollection[0],
  });

  useEffect(() => {
    if (!authLoading) {
      setUser(authUser);
    }
  }, [authUser, authLoading]);

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
    nextPage,
    prevPage,
    errors,
    loading,
    user,
    ticketCollection,
  };
}
