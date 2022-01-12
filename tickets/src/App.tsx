import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { routes } from './data/routes';
import { Loader } from './components/Loader/Loader';
import Login from './pages/Login';
import { getMessages, getUser } from './redux/selectors';
import { deleteMessage } from './redux/slices/messages';

export default function App() {
  const user = useSelector(getUser);
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!messages.length) return;
    const { id, type, content } = messages[0];
    toast[type](content);
    dispatch(deleteMessage(id));
  }, [messages]);

  if (!user) {
    return (
      <>
        <Loader />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Loader />
      <Toaster />
      <Routes>
        { Object.entries(routes).map(([path, element]) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        )) }
      </Routes>
    </>
  );
}
