import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTicket, getUser } from '../../redux/selectors';

export default function Ticket() {
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));
  const user = useSelector(getUser);

  return (
    <div>
      <h1>{ticket.title}</h1>
      {
        ticket.author.id === user.id && <Link to={`/tickets/edit/${id}`}>Edit ticket</Link>
      }
    </div>
  );
}
