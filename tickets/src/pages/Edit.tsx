import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import Form from '../components/Form/Form';
import { getTicket, getUser } from '../redux/selectors';
import Page from './Page';
import { GridFullWidth, Title1 } from '../styles';

function Edit() {
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));
  const user = useSelector(getUser);

  if (ticket && ticket.author.id !== user.id) return <Navigate to={`/tickets/${ticket.id}`} />;

  return (
    <Page header={(
      <Title1>Edit</Title1>
    )}
    >
      {
        ticket && (
        <GridFullWidth elevation={3}>
          <Form ticket={Object.fromEntries(Object.entries(ticket).filter(([key]) => key !== 'createdAt' && key !== 'updatedAt')) as Partial<TTicket>} />
        </GridFullWidth>
        )
}
    </Page>
  );
}

export default Edit;
