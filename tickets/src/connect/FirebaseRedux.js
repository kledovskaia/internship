import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TicketIdContext } from "../context/TicketId";
import { useFirebase } from "../hooks/useFirebase";
import { setErrors } from "../redux/slices/errors";
import { setLoading } from "../redux/slices/loading";
import { setTicket } from "../redux/slices/ticket";
import { setTicketCollection } from "../redux/slices/ticketCollection";
import { setUser } from "../redux/slices/user";

export const FirebaseRedux = ({ children }) => {
  const { ticketId } = useContext(TicketIdContext)
  const { 
    errors,
    loading,
    user, 
    ticket,
    ticketCollection 
  } = useFirebase(ticketId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading, dispatch])

  useEffect(() => {
    dispatch(setErrors(errors))
  }, [errors, dispatch])
  
  useEffect(() => {
    dispatch(setUser(user))
  }, [user, dispatch])

  useEffect(() => {
    dispatch(setTicket(ticket))
  }, [ticket, dispatch])

  useEffect(() => {
    dispatch(setTicketCollection(ticketCollection))
  }, [ticketCollection, dispatch])

  return children;
}