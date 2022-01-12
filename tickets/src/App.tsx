import { useSelector } from 'react-redux';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { routes } from './data/routes';
import Page from './pages/Page';
import { Loader } from './components/Loader/Loader';
import Login from './pages/Login';
import { getUser } from './redux/selectors';

export default function App() {
  const user = useSelector(getUser);

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
      <Routes>
        { Object.entries(routes).map(([path, { title, element }]) => (
          <Route key={path} path={path} element={<Page pageTitle={title}>{element}</Page>} />
        )) }
      </Routes>
    </>
  );
}
