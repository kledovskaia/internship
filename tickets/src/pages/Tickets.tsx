import { useSelector } from 'react-redux';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
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
import { sortByQuery } from '../utils/utils';

export default function Tickets() {
  const { query, updateQuery, updateQueryWithDebounce } = useQuery();
  const ticketCollection = useSelector(getTicketCollection);
  const [filteredTickets, setFilteredTickets] = useState<TTicket[]>();

  useEffect(() => {
    if (!ticketCollection) return;
    const result = sortByQuery(query, ticketCollection);
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
