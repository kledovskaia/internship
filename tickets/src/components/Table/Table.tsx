import { Button } from '@mui/material';
import { Box } from '@mui/system';
import {
  TableHeader, TableContainer, OrderIcon, TableRowContainer,
} from './styles';
import TableRow from './TableRow/TableRow';
import { FlexContainer } from '../../styles';

type Props = {
  tickets: TTicket[]
  updateQuery: (name: string, value: string) => void
  query: TQueryParams
}

export default function Table({ tickets, updateQuery, query }: Props) {
  const handleDateOrder = () => {
    if (query.order) {
      const [type, order] = query.order.split('-');
      if (type === 'date' && order === 'desc') {
        updateQuery('order', 'date-asc');
        return;
      }
    }
    updateQuery('order', 'date-desc');
  };

  const handlePriorityOrder = () => {
    if (query.order) {
      const [type, order] = query.order.split('-');
      if (type === 'priority' && order === 'desc') {
        updateQuery('order', 'priority-asc');
        return;
      }
    }
    updateQuery('order', 'priority-desc');
  };

  const [type, order] = (query.order || '').split('-');

  return (
    <TableContainer>
      <TableRowContainer>
        <TableHeader>Ticket Details</TableHeader>
        <TableHeader>Owner Name</TableHeader>
        <TableHeader>
          <Button onClick={handleDateOrder}>
            <FlexContainer>
              <Box>
                Date
              </Box>
              { type === 'date' && (
              <OrderIcon order={order} />
              ) }
            </FlexContainer>
          </Button>
        </TableHeader>
        <TableHeader>
          <Button onClick={handlePriorityOrder}>
            <FlexContainer>
              <Box>
                Priority
              </Box>
              { type === 'priority' && (
              <OrderIcon order={order} />
              ) }
            </FlexContainer>
          </Button>
        </TableHeader>
        <TableHeader>{' '}</TableHeader>
      </TableRowContainer>
      {tickets?.map((ticket) => (
        <TableRow key={ticket.id} ticket={ticket} />
      ))}
    </TableContainer>
  );
}
