import styled from 'styled-components';
import 'styled-components/macro';

export const UserContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * + * {
    margin-left: 0.5em;
  }
`;
