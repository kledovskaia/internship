import styled from 'styled-components';
import 'styled-components/macro';
import { Link as RLink } from 'react-router-dom';
import SortIcon from '@mui/icons-material/Sort';

export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr;

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

export const OrderIcon = styled(SortIcon)`
  transform: ${({ order }) => (order === 'asc' ? 'rotateX(180deg)' : 'rotateX(0deg)')};
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
