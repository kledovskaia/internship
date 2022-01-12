import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/selectors';

type Props = {
  ticket: TTicket
}

export default function Ticket({ ticket }: Props) {
  const user = useSelector(getUser);

  return (
    !!ticket && (
    <div>
      <h1>{ticket.title}</h1>
      {
        ticket.author.id === user.id && <Link to={`/tickets/edit/${ticket.id}`}>Edit ticket</Link>
      }
    </div>
    )
  );
}
