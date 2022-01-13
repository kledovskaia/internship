import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTicket } from '../redux/thunks/tickets';
import { getTicket, getUser } from '../redux/selectors';
import Ticket from '../components/Ticket/Ticket';
import { GridFullWidth, Title1 } from '../styles';
import Page from './Page';

function TicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticket = useSelector(getTicket(id));
  const user = useSelector(getUser);

  const handleDelete = async () => {
    await dispatch(deleteTicket(ticket));
    navigate('/tickets');
  };

  return (
    <Page header={(
      <Title1>New</Title1>
    )}
    >
      {
          ticket && (
          <GridFullWidth elevation={3}>
            <Ticket
              handleDelete={handleDelete}
              isAuthor={user.id === ticket.author.id}
              ticket={ticket}
            />
          </GridFullWidth>
          )
      }
    </Page>
  );
}

export default TicketPage;
