import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import { Title1 } from '../styles';
import { addTicket } from '../redux/thunks/tickets';
import Form from '../components/Form/Form';
import Page from './Page';

function New() {
  const dispatch = useDispatch();

  const onSubmit = (data: Partial<TTicket>) => dispatch(addTicket(data));

  return (
    <Page header={(
      <Title1>New</Title1>
    )}
    >
      <Paper elevation={3}>
        <Form ticket={null} onSubmit={onSubmit} />
      </Paper>
    </Page>
  );
}

export default New;
