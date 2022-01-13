import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { priorityLevels } from '../data/priorityLevels';
import {
  ButtonLink,
  FlexContainer, GridFullWidth, Title1, Title2,
} from '../styles';
import Pagination from '../components/Pagination/Pagination';
import { getTicketCollection } from '../redux/selectors';
import Table from '../components/Table/Table';
import { useQuery } from '../hooks/useQuery';
import Page from './Page';
import { Search } from '../components/Search/Search';

const formatted = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').split(' ');

export default function Tickets() {
  const { query, updateQuery, updateQueryWithDebounce } = useQuery();
  const ticketCollection = useSelector(getTicketCollection);
  const [filteredTickets, setFilteredTickets] = useState<TTicket[]>();

  useEffect(() => {
    if (!ticketCollection) return;
    let result = [...ticketCollection];
    if (query.order) {
      const [type, order] = query.order.split('-');
      if (type === 'date' && order === 'asc') {
        result.sort((a, b) => a.createdAt - b.createdAt);
      } else if (type === 'date' && order === 'desc') {
        result.sort((a, b) => b.createdAt - a.createdAt);
      } else if (type === 'priority' && order === 'asc') {
        result.sort((a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]);
      } else if (type === 'priority' && order === 'desc') {
        result.sort((a, b) => priorityLevels[b.priority] - priorityLevels[a.priority]);
      }
    }
    if (query.search) {
      result = result.filter(
        (ticket) => formatted(query.search)
          .every((searchWord) => formatted(ticket.title)
            .some((word) => word.includes(searchWord))),
      );
    }

    setFilteredTickets(result);
  }, [query, ticketCollection]);

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
          <FlexContainer>
            <Title2>All tickets</Title2>
            <ButtonLink to="/tickets/new">New Ticket</ButtonLink>
          </FlexContainer>
        </Box>
        <Table
          query={query}
          updateQuery={updateQuery}
          tickets={filteredTickets?.slice(
            +query.page * +query.perPage,
            (+query.page * +query.perPage) + +query.perPage,
          )}
        />
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
