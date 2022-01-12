import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTicket } from '../redux/thunks/tickets';
import Form from '../components/Form/Form';
import { getTicket } from '../redux/selectors';
import Page from './Page';
import { Title1 } from '../styles';

function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));

  const onSubmit = (data: Partial<TTicket>) => dispatch(updateTicket(data));

  return (
    <Page header={(
      <Title1>Edit</Title1>
    )}
    >
      <Form ticket={Object.fromEntries(Object.entries(ticket).filter(([key]) => key !== 'createdAt' && key !== 'updatedAt')) as Partial<TTicket>} onSubmit={onSubmit} />
      ;
    </Page>
  );
}

export default Edit;
