import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/selectors';
import { deleteTicket } from '../../redux/thunks/tickets';

type Props = {
  ticket: TTicket
}

export default function TicketPreview({ ticket }: Props) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const handleClick = () => dispatch(deleteTicket(ticket));

  return (
    <div>
      <Link to={ticket.author.id === user.id ? `/tickets/edit/${ticket.id}` : `/tickets/${ticket.id}`}>
        <h2>{ticket.title}</h2>
      </Link>
      { ticket.author.id === user.id && <button onClick={handleClick} type="button">Delete Ticket</button>}
    </div>
  );
}
