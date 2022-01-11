import { Link } from 'react-router-dom';

type Props = {
  ticket: TTicket
}

export default function TicketPreview({ ticket }: Props) {
  return (
    <div>
      <h2>{ticket.title}</h2>
    </div>
  );
}
