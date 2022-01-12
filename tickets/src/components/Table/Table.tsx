import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { Fragment } from 'react';
import { TableHeader, TableCell, TableContainer } from './styles';

type Props = {
  tickets: TTicket[]
}

const dateOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
} as const;
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
} as const;

export default function Table({ tickets }: Props) {
  return (
    <TableContainer>
      <TableHeader>Ticket Details</TableHeader>
      <TableHeader>Owner Name</TableHeader>
      <TableHeader>Date</TableHeader>
      <TableHeader>Priority</TableHeader>
      {tickets?.map((ticket) => (
        <Fragment key={ticket.id}>
          <TableCell>
            <Avatar src={ticket.author.photoURL} alt={ticket.author.displayName} />
            <Box>
              <Typography>
                {ticket.title}
              </Typography>
              <Typography>
                {moment.utc(ticket.updatedAt || ticket.createdAt).local().startOf('seconds').fromNow()}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>{ticket.author.displayName}</TableCell>
          <TableCell>
            <Typography>
              {new Date(ticket.createdAt).toLocaleDateString(undefined, dateOptions)}
            </Typography>
            <Typography>
              {new Date(ticket.createdAt).toLocaleTimeString(undefined, timeOptions)}
            </Typography>
          </TableCell>
          <TableCell>{ticket.priority}</TableCell>
        </Fragment>
      ))}
    </TableContainer>
  );
}
