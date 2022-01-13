import styled from 'styled-components';
import 'styled-components/macro';

export const TicketContainer = styled.section`
  & > * + * {
    margin-top: 1rem;
  }
`;
