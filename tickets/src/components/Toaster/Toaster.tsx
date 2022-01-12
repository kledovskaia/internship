import { useEffect } from 'react';
import toast, { Toaster as Notification } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../redux/slices/messages';
import { getMessages } from '../../redux/selectors';

export function Toaster() {
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!messages.length) return;
    const { id, type, content } = messages[0];
    toast[type](content);
    dispatch(deleteMessage(id));
  }, [messages]);

  return <Notification />;
}
