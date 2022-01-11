import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import { addTicket } from '../redux/thunks/tickets';
import Form from '../components/Form/Form';

function New() {
  const dispatch = useDispatch();

  const onSubmit = (data: Partial<TTicket>) => dispatch(addTicket(data));

  return (
    <Paper elevation={3}>
      <Form ticket={null} onSubmit={onSubmit} />
    </Paper>
  );
}

export default New;
