import { useSelector } from 'react-redux';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { routes } from './data/routes';
import Login from './pages/Login';
import { getUser } from './redux/selectors';

export default function App() {
  const user = useSelector(getUser);

  if (!user) {
    return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      { Object.entries(routes).map(([path, element]) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      )) }
    </Routes>
  );
}
