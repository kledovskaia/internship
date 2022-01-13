import { useDispatch, useSelector } from 'react-redux';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import {
  ButtonLink,
  FlexContainer, GridContainer, GridFullWidth, GridMiddleWidth, SpaceBetween, Title1, Title2,
} from '../styles';
import Pagination from '../components/Pagination/Pagination';
import { getTicketCollection, getUser } from '../redux/selectors';
import Table from '../components/Table/Table';
import { useQuery } from '../hooks/useQuery';
import Page from './Page';
import { Search } from '../components/Search/Search';
import { sortByQuery } from '../utils/utils';
import Ticket from '../components/Ticket/Ticket';
import { deleteTicket } from '../redux/thunks/tickets';

export default function Tickets() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { query, updateQuery, updateQueryWithDebounce } = useQuery();
  const ticketCollection = useSelector(getTicketCollection);
  const [filteredTickets, setFilteredTickets] = useState<TTicket[]>();
  const [view, setView] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    if (!ticketCollection) return;
    const result = sortByQuery(query, ticketCollection);
    setFilteredTickets(result);
  }, [query, ticketCollection]);

  useEffect(() => {
    updateQuery('order');
  }, [view]);

  const handleDelete = (data: Partial<TTicket>) => {
    dispatch(deleteTicket(data));
  };

  return (
    <Page header={(
      <>
        <Title1>Tickets</Title1>
        <Search handleChange={updateQueryWithDebounce} />
      </>
      )}
    >
      <GridFullWidth elevation={3}>
        <Box p={2}>
          <SpaceBetween>
            <FlexContainer>
              <Title2>All tickets</Title2>
              <ButtonLink to="/tickets/new">New Ticket</ButtonLink>
            </FlexContainer>
            <FlexContainer>
              <Typography>View:</Typography>
              <Box>
                <IconButton onClick={() => setView('grid')} size="large"><GridViewSharpIcon color={view === 'grid' ? 'success' : 'inherit'} /></IconButton>
                <IconButton onClick={() => setView('list')} size="large"><ViewListIcon color={view === 'list' ? 'success' : 'inherit'} /></IconButton>
              </Box>
            </FlexContainer>
          </SpaceBetween>
        </Box>
        {
          view === 'list' && (
          <Table
            query={query}
            updateQuery={updateQuery}
            tickets={filteredTickets?.slice(
              +query.page * +query.perPage,
              (+query.page * +query.perPage) + +query.perPage,
            )}
          />
          )
        }
        {
          view === 'grid' && (
            <GridContainer>
              { filteredTickets.map((ticket) => (
                <GridMiddleWidth elevation={7} key={ticket.id}>
                  <Ticket
                    handleDelete={handleDelete}
                    isAuthor={user.id === ticket.author.id}
                    ticket={ticket}
                  />
                </GridMiddleWidth>

              )) }
            </GridContainer>
          )
        }
        {filteredTickets && (
        <Pagination
          page={+query.page}
          perPage={+query.perPage}
          handleChange={updateQuery}
          total={filteredTickets.length}
        />
        )}

      </GridFullWidth>
    </Page>
  );
}
