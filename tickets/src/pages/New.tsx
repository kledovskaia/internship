import { useDispatch } from 'react-redux';
import { addTicket } from '../redux/thunks/tickets';
import Form from '../components/Form/Form';

function New() {
  const dispatch = useDispatch();

  const onSubmit = (data: Partial<TTicket>) => dispatch(addTicket(data));

  return (
    <>
      <h1>New</h1>
      <Form ticket={null} onSubmit={onSubmit} />
    </>
  );
}

export default New;
