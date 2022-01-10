import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Page from './pages/Page';
import { Loader } from './components/Loader/Loader';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import Login from './pages/Login';
import New from './pages/New';
import Ticket from './components/Ticket/Ticket';
import Tickets from './pages/Tickets';
import { getUser } from './redux/selectors';

const routes = ({
  '/dashboard': { title: 'Dashboard', element: <Dashboard /> },
  '/tickets': { title: 'Tickets', element: <Tickets /> },
  '/tickets/new': { title: 'New', element: <New /> },
  '/tickets/edit/:id': { title: 'Edit', element: <Edit /> },
  '/tickets/:id': { title: 'Ticket', element: <Ticket /> },
  '*': { title: '', element: <Navigate to="/dashboard " /> },
});

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
