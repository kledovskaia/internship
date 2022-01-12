import styled from 'styled-components';
import 'styled-components/macro';

export const FormContainer = styled.form`
  padding: 0 1em 2em;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 2em;
`;

export const FormTitle = styled.h2`
  grid-column: 1 / -1;
`;

export const FormLargeField = styled.div`
  grid-column: 1 / -1;
  display: flex;
  & > * {
    flex: 1;
  }
`;
export const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
`;

export const EditingButtons = styled.div`
  flex: 1;
  margin-left: 2em;
  display: flex;
  justify-content: space-between;
`;
