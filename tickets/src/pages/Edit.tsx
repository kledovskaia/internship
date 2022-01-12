import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from '../components/Form/Form';
import { getTicket } from '../redux/selectors';
import Page from './Page';
import { GridFullWidth, Title1 } from '../styles';

function Edit() {
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));

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
