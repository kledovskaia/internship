import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Priority from '../../Priority/Priority';
// import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/selectors';
import { Link, TableCell } from '../styles';

const dateOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
} as const;
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
} as const;

type Props = {
  ticket: TTicket
}

export default function TableRow({ ticket }: Props) {
  const user = useSelector(getUser);

  return (
    <>
      <TableCell>
        <Avatar src={ticket.author.photoURL} alt={ticket.author.displayName} />
        <Link to={
      ticket.author.id === user.id ?
        `/tickets/edit/${ticket.id}` :
        `/tickets/${ticket.id}`
    }
        >
          <Box>
            <Typography>
              {ticket.title}
            </Typography>
            <Typography>
              updated
              {' '}
              {moment.utc(ticket.updatedAt || ticket.createdAt).fromNow()}
            </Typography>
          </Box>
        </Link>
      </TableCell>
      <TableCell>{ticket.author.displayName}</TableCell>
      <TableCell>
        <Box>
          <Typography>
            {new Date(ticket.createdAt).toLocaleDateString(undefined, dateOptions)}
          </Typography>
          <Typography>
            {new Date(ticket.createdAt).toLocaleTimeString(undefined, timeOptions)}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Priority>
          {ticket.priority}
        </Priority>

      </TableCell>
    </>
  );
}
