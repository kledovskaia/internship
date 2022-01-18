import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import { deleteTicket } from '../../../redux/thunks/tickets';
import Priority from '../../Priority/Priority';
import { getUser } from '../../../redux/selectors';
import {
  ButtonContainer, Link, TableCell, TableDate, TableRowContainer, TableTitle,
} from '../styles';

const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
} as const;

type Props = {
  ticket: TTicket
}

export default function TableRow({ ticket }: Props) {
  const user = useSelector(getUser);
  const [onDelete, setOnDelete] = useState(false);
  const dispatch = useDispatch();

  const toggleOnDelete = () => setOnDelete((state) => !state);

  const handleDelete = () => {
    dispatch(deleteTicket(ticket));
  };

  return (
    <TableRowContainer isCompleted={ticket.completed}>
      <Link to={
      ticket.author.id === user.id ?
        `/tickets/edit/${ticket.id}` :
        `/tickets/${ticket.id}`
    }
      >
        <TableCell>
          <Avatar src={ticket.author.photoURL} alt={ticket.author.displayName} />
          <Box>
            <TableTitle>
              {ticket.title}
            </TableTitle>
            <Typography>
              updated
              {' '}
              { formatDistance(
                new Date(),
                new Date(ticket.updatedAt),
              ) }
              {' '}
              ago
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{ticket.author.displayName}</TableCell>
        <TableCell>
          <TableDate>
            <Typography>
              {new Date(ticket.createdAt).toDateString().split(' ').slice(1)
                .join(' ')}
            </Typography>
            <Typography>
              {new Date(ticket.createdAt).toLocaleTimeString(undefined, timeOptions)}
            </Typography>
          </TableDate>
        </TableCell>
        <TableCell>
          <Priority>
            {ticket.priority}
          </Priority>
        </TableCell>
      </Link>
      <TableCell>
        { ticket.author.id === user.id && !ticket.completed && (
          <ButtonContainer>
            { !onDelete && (
            <IconButton onClick={toggleOnDelete}>
              <DeleteIcon />
            </IconButton>
            )}
            {onDelete && (
            <>
              <IconButton onClick={handleDelete}>
                <DoneIcon color="success" />
              </IconButton>
              <IconButton onClick={toggleOnDelete}>
                <ClearIcon color="error" />
              </IconButton>
            </>
            )}
          </ButtonContainer>
        )}
      </TableCell>
    </TableRowContainer>
  );
}
