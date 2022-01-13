import { Button } from '@mui/material';
import { TableHeader, TableContainer } from './styles';
import TableRow from './TableRow/TableRow';

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

  return (
    <TableContainer>
      <TableHeader>Ticket Details</TableHeader>
      <TableHeader>Owner Name</TableHeader>
      <TableHeader>
        <Button onClick={handleDateOrder}>
          Date
        </Button>
      </TableHeader>
      <TableHeader>
        <Button onClick={handlePriorityOrder}>
          Priority
        </Button>
      </TableHeader>
      {tickets?.map((ticket) => (
        <TableRow key={ticket.id} ticket={ticket} />
      ))}
    </TableContainer>
  );
}
