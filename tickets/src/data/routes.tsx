import { Navigate } from 'react-router-dom';
import Ticket from '../components/Ticket/Ticket';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import New from '../pages/New';
import Tickets from '../pages/Tickets';

export const routes = ({
  '/dashboard': { title: 'Dashboard', element: <Dashboard /> },
  '/tickets': { title: 'Tickets', element: <Tickets /> },
  '/tickets/new': { title: 'New', element: <New /> },
  '/tickets/edit/:id': { title: 'Edit', element: <Edit /> },
  '/tickets/:id': { title: 'Ticket', element: <Ticket /> },
  '*': { title: '', element: <Navigate to="/dashboard " /> },
});
