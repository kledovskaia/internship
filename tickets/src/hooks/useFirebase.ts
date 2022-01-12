import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import equal from 'deep-equal';
import { getFromLocalStorage, transformTicket } from '../utils/utils';
import { auth, getTicketCollectionQuery, totalQuery } from '../firebase/firebase';

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
  const [params, setParams] = useState<ParsedQuery>({});
  const [ticketsQuery, setTicketsQuery] = useState(null);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [total, totalLoading, totalError] = useDocumentData(totalQuery);
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
    const paramsObj = queryString.parse(location.search);
    if (equal(params, paramsObj)) return;
    if (
      equal(paramsObj.orderBy, params.orderBy) &&
      +paramsObj.page < +params.page
    ) return;
    setParams(queryString.parse(location.search));
  }, [location]);

  useEffect(() => {
    if (!authLoading) {
      setUser(authUser);
    }
  }, [authUser, authLoading]);

  useEffect(() => {
    setTicketsQuery(getTicketCollectionQuery(params));
  }, [params]);

  useEffect(() => {
    setLoading(authLoading || ticketCollectionLoading || totalLoading);
  }, [authLoading, ticketCollectionLoading, totalLoading]);

  useEffect(() => {
    const newErrors = [authError, ticketCollectionError, totalError].filter(
      (error) => error,
    );
    setErrors((state) => [...state, ...newErrors]);
  }, [authError, ticketCollectionError, totalError]);

  return {
    total: total?.value,
    errors,
    loading,
    user,
    ticketCollection,
  };
}
