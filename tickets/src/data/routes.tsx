import { Navigate } from 'react-router-dom';
import TicketPage from '../pages/TicketPage';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import New from '../pages/New';
import Tickets from '../pages/Tickets';

export const routes = ({
  '/dashboard': <Dashboard />,
  '/tickets': <Tickets />,
  '/tickets/new': <New />,
  '/tickets/edit/:id': <Edit />,
  '/tickets/:id': <TicketPage />,
  '*': <Navigate to="/dashboard " />,
});
