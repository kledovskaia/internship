import styled from 'styled-components';
import 'styled-components/macro';
import { Link as RLink } from 'react-router-dom';

export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  & > * {
    padding: 0 1em 1em;
  }
`;
export const TableHeader = styled.div``;
export const TableCell = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled(RLink)`
  flex: 1;
  text-decoration: none;
  color: inherit;
  padding: 0 1em;
`;
