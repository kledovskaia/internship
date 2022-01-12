import { Navigate } from 'react-router-dom';
import Ticket from '../components/Ticket/Ticket';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import New from '../pages/New';
import Tickets from '../pages/Tickets';

export const routes = ({
  '/dashboard': <Dashboard />,
  '/tickets': <Tickets />,
  '/tickets/new': <New />,
  '/tickets/edit/:id': <Edit />,
  '/tickets/:id': <Ticket />,
  '*': <Navigate to="/dashboard " />,
});
