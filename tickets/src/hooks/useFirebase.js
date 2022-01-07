import { auth, getTicketCollectionQuery } from "../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'  
import { useEffect, useState } from "react";

const transform = ({ updatedAt, createdAt, ...doc }) => ({
  ...doc,
  createdAt: (createdAt.seconds * 1000 + createdAt.nanoseconds / 1000),
  ...(updatedAt ? { updatedAt: (updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000) } : {})
})

export const useFirebase = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const [ticketCollection, ticketCollectionLoading, ticketCollectionError] = useCollectionData(getTicketCollectionQuery(), { transform });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setLoading(authLoading || ticketCollectionLoading);
  }, [authLoading, ticketCollectionLoading])

  useEffect(() => {
    const newErrors = [authError, ticketCollectionError].filter(error => error)
    setErrors(state => [...state, ...newErrors]);
  }, [authError, ticketCollectionError])

  return {
    errors,
    loading,
    user,
    ticketCollection
  }
}