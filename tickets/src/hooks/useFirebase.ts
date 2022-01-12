import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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
export default function useFirebase(params: TQueryParams) {
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
    if (!authLoading) {
      setUser(authUser);
    }
  }, [authUser, authLoading]);

  useEffect(() => {
    // let type: 'next' | 'prev';
    // if (prevPage === undefined && +params.page === 0) {
    //   type = 'next';
    // }
    setTicketsQuery(getTicketCollectionQuery({
      params,
      // first: ticketCollection[0],
      // last: ticketCollection[ticketCollection.length - 1],
    }));
    // setPrevPage(+params.page);
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
