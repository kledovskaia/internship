import {
  useEffect, useLayoutEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import useFirebase from '../hooks/useFirebase';
import { addMessage } from '../redux/slices/messages';
import { setLoading } from '../redux/slices/loading';
import { setTicketCollection } from '../redux/slices/ticketCollection';
import { setUser } from '../redux/slices/user';
import { messageTransformer, setToLocalStorage } from '../utils/utils';

type Props = {
  children: JSX.Element
}

export default function FirebaseRedux({ children }: Props) {
  const {
    errors,
    loading,
    user,
    ticketCollection,
  } = useFirebase();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (!errors.length) return;
    const transformedErrors = errors.map((error) => messageTransformer('error', error));
    dispatch(addMessage(transformedErrors));
  }, [errors, dispatch]);

  useLayoutEffect(() => {
    if (user === null) {
      setToLocalStorage('tickets-user', user);
      dispatch(setUser(user));
      return;
    }

    const userObj: TUser = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };
    setToLocalStorage('tickets-user', userObj);
    dispatch(setUser(userObj));
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(setTicketCollection(ticketCollection));
  }, [ticketCollection, dispatch]);

  return (
    children
  );
}
