import { Link } from "react-router-dom"

export const TicketPreview = ({ ticket }) => {
  return (
    <div>
      <Link to={`/tickets/${ticket.id}`}>
        <h2>{ticket.title}</h2>
      </Link>
    </div>
  )
}