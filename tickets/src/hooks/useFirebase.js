import { auth, getTicketCollectionQuery, getTicketQuery } from "../firebase/firebase";
import { useAuthState, useDocumentData, useCollectionData } from 'react-firebase-hooks'  
import { useEffect, useState } from "react";

export const useFirebase = (ticketId) => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [ticket, ticketLoading, ticketError] = useDocumentData(getTicketQuery(ticketId));
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] = useCollectionData(getTicketCollectionQuery());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLoading(authLoading || ticketLoading || ticketCollectionLoading);
  }, [authLoading, ticketLoading, ticketCollectionLoading])

  useEffect(() => {
    const newErrors = [authError, ticketError, ticketCollectionError].filter(error => error)
    setErrors(state => [...state, ...newErrors]);
  }, [authError, ticketError, ticketCollectionError])

  return {
    errors,
    loading,
    user, 
    ticket,
    ticketCollection
  }
}