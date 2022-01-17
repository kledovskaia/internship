import styled from 'styled-components';
import 'styled-components/macro';
import { Link as RLink } from 'react-router-dom';
import SortIcon from '@mui/icons-material/Sort';

export const TableContainer = styled.div`
  min-height: 40.5em;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 7rem;
  grid-template-rows: repeat(64, min-content);
  align-items: flex-start;
`;

type TableRowProps = {
  isCompleted?: boolean
}

export const TableRowContainer = styled.div<TableRowProps>`
  border-bottom: 0.1rem solid #aaaaaa40;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 7rem;
  background-color: ${({ isCompleted }) => (isCompleted ? '#00ff0030' : 'transparent')}
`;

export const TableTitle = styled.h4`
  word-break: break-all;
  margin: 0;
`;

export const TableDate = styled.div`
`;

export const TableHeader = styled.div`
  padding: 0 1em 1em;
  white-space: nowrap;
`;
export const TableCell = styled.div`
  padding: 0.5em 1em;
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 1em;
  }
`;

export const Link = styled(RLink)`
  grid-column: 1 / -2;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  text-decoration: none;
  color: inherit;
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
