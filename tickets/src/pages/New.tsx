import { useDispatch } from 'react-redux';
import { GridFullWidth, Title1 } from '../styles';
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
      <GridFullWidth elevation={3}>
        <Form onSubmit={onSubmit} />
      </GridFullWidth>
    </Page>
  );
}

export default New;
