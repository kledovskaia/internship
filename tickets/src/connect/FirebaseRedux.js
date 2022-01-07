import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "../hooks/useFirebase";
import { addMessage } from "../redux/slices/messages";
import { setLoading } from "../redux/slices/loading";
import { setTicketCollection } from "../redux/slices/ticketCollection";
import { setUser } from "../redux/slices/user";
import { messageTransformer } from "../utils/utils";

export const FirebaseRedux = ({ children }) => {
  const { 
    errors,
    loading,
    user, 
    ticketCollection 
  } = useFirebase()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading, dispatch])

  useEffect(() => {
    if (!errors.length) return;
    const transformedErrors = errors.map(messageTransformer('error', errors))   
    dispatch(addMessage(transformedErrors))
  }, [errors, dispatch])
  
  useLayoutEffect(() => {
    if (!user) dispatch(setUser(user))
    else dispatch(setUser({
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }))
  }, [user, dispatch])

  useEffect(() => {
    dispatch(setTicketCollection(ticketCollection))
  }, [ticketCollection, dispatch])

  return children;
}