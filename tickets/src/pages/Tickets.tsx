import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Typography } from '@mui/material';
import {
  FlexContainer, GridFullWidth, Title1, Title2,
} from '../styles';
import Pagination from '../components/Pagination/Pagination';
import { getTicketCollection } from '../redux/selectors';
import Table from '../components/Table/Table';
import { useQuery } from '../hooks/useQuery';
import Page from './Page';
import { Search } from '../components/Search/Search';

export default function Tickets() {
  const ticketCollection = useSelector(getTicketCollection);
  const { query, updateQuery, updateQueryWithDebounce } = useQuery();

  return (
    <Page header={(
      <>
        <Title1>Tickets</Title1>
        <Search handleChange={updateQueryWithDebounce} />
      </>
      )}
    >
      <GridFullWidth elevation={3}>
        <FlexContainer>
          <Title2>All tickets</Title2>
          <Link to="/tickets/new">New Ticket</Link>
        </FlexContainer>
        <Table
          tickets={ticketCollection?.slice(
            +query.page * +query.perPage,
            (+query.page * +query.perPage) + +query.perPage,
          )}
        />
        {ticketCollection && (
        <Pagination
          page={+query.page}
          perPage={+query.perPage}
          handleChange={updateQuery}
          total={ticketCollection.length}
        />
        )}

      </GridFullWidth>
    </Page>
  );
}
