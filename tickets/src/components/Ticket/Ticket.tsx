import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { FlexContainer, TicketContainer } from '../../styles';
import Priority from '../Priority/Priority';

const dateOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
} as const;
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
} as const;

type Props = {
  ticket: TTicket
  isAuthor: boolean
  handleDelete: (data: Partial<TTicket>) => void
}

export default function Ticket({ ticket, isAuthor, handleDelete }: Props) {
  return (
    <TicketContainer isCompleted={ticket.completed}>
      <CardHeader
        action={(
          <FlexContainer>
            <Box mr={(isAuthor && !ticket.completed) ? 6 : 0}>
              <Priority>{ticket.priority}</Priority>
            </Box>
            {(isAuthor && !ticket.completed) && (
            <FlexContainer>
              <Link to={`/tickets/edit/${ticket.id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(ticket)}>
                <DeleteIcon />
              </IconButton>
            </FlexContainer>
            )}
          </FlexContainer>
        )}
        title={(
              new Date(ticket.createdAt).toLocaleDateString(undefined, dateOptions)
        )}
        subheader={
              new Date(ticket.createdAt).toLocaleTimeString(undefined, timeOptions)
        }
      />
      <CardContent>
        <Typography variant="h6">
          {ticket.title}
        </Typography>
        <Typography variant="body1">
          {ticket.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated
          {' '}
          {moment.utc(ticket.updatedAt || ticket.createdAt).fromNow()}
        </Typography>
        <FlexContainer mt={3}>
          <Avatar src={ticket.author.photoURL} alt={ticket.author.displayName} />
          <Typography variant="body1">{ticket.author.displayName}</Typography>
        </FlexContainer>
      </CardContent>
    </TicketContainer>
  );
}
