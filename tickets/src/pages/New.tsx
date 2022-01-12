import { GridFullWidth, Title1 } from '../styles';
import Form from '../components/Form/Form';
import Page from './Page';

function New() {
  return (
    <Page header={(
      <Title1>New</Title1>
    )}
    >
      <GridFullWidth elevation={3}>
        <Form />
      </GridFullWidth>
    </Page>
  );
}

export default New;
