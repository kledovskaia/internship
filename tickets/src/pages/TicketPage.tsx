import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTicket } from '../redux/selectors';
import Ticket from '../components/Ticket/Ticket';
import { GridFullWidth, Title1 } from '../styles';
import Page from './Page';

function TicketPage() {
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));
  return (
    <Page header={(
      <Title1>New</Title1>
    )}
    >
      <GridFullWidth elevation={3}>
        <Ticket ticket={ticket} />
      </GridFullWidth>
    </Page>
  );
}

export default TicketPage;
