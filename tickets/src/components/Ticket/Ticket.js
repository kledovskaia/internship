import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getTicket } from "../../redux/selectors"

export const Ticket = () => {
  const { id } = useParams()
  const ticket = useSelector(getTicket(id))

  return (
    <div>
      <h1>{ticket.title}</h1>
      <Link to={`/tickets/edit/${id}`}>Edit ticket</Link>
    </div>
  )
}