import { TableHeader, TableContainer } from './styles';
import TableRow from './TableRow/TableRow';

type Props = {
  tickets: TTicket[]
}

export default function Table({ tickets }: Props) {
  return (
    <TableContainer>
      <TableHeader>Ticket Details</TableHeader>
      <TableHeader>Owner Name</TableHeader>
      <TableHeader>Date</TableHeader>
      <TableHeader>Priority</TableHeader>
      {tickets?.map((ticket) => (
        <TableRow key={ticket.id} ticket={ticket} />
      ))}
    </TableContainer>
  );
}
