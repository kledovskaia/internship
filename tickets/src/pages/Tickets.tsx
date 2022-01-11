import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { getTicketCollection } from '../redux/selectors';
import TicketPreview from '../components/TicketPreview/TicketPreview';

export default function Tickets() {
  const ticketCollection = useSelector(getTicketCollection);
  const [pageSize, setPageSize] = useState(8);
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <Paper elevation={3}>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>
      {ticketCollection.slice(
        pageSize * pageNumber,
        pageSize * pageNumber + pageSize,
      ).map((ticket) => (
        <TicketPreview key={ticket.id} ticket={ticket} />
      ))}
    </Paper>
  );
}
