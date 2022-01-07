import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getTicketCollection } from "../redux/selectors"
import { TicketPreview } from "../components/TicketPreview/TicketPreview"

export const Tickets = () => {
  const ticketCollection = useSelector(getTicketCollection)

  return (
    <>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>  
      { 
        ticketCollection.map(ticket => <TicketPreview key={ticket.id} ticket={ticket}/>)
      }
    </>
  )
}