import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Title1 } from '../styles';
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
      <Paper elevation={3}>
        <Title1>All tickets</Title1>
        <Link to="/tickets/new">New Ticket</Link>
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

      </Paper>
    </Page>
  );
}
