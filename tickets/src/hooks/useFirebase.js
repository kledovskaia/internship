import { auth, getTicketCollectionQuery, getTicketQuery } from "../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore'  
import { useContext, useEffect, useState } from "react";
import { TicketIdContext } from "../context/TicketId";

const transform = ({ updatedAt, createdAt, ...doc }) => ({
  ...doc,
  createdAt: (createdAt.seconds * 1000 + createdAt.nanoseconds / 1000),
  ...(updatedAt ? { updatedAt: (updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000) } : {})
})

export const useFirebase = () => {
  const { ticketId } = useContext(TicketIdContext);
  const [user, authLoading, authError] = useAuthState(auth);
  const [ticket, ticketLoading, ticketError] = useDocumentData(getTicketQuery(ticketId), { transform });
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] = useCollectionData(getTicketCollectionQuery(), { transform });
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