import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useCallback, useEffect, useState,
} from 'react';
import { Paper } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import queryString from 'query-string';
import Pagination from '../components/Pagination/Pagination';
import { getTicketCollection, getTotal } from '../redux/selectors';
import TicketPreview from '../components/TicketPreview/TicketPreview';

const defaultQuery = {
  perPage: '8',
  page: '0',
};

export default function Tickets() {
  const total = useSelector(getTotal);
  const location = useLocation();
  const [query, setQuery] = useState<TQueryParams>({
    ...defaultQuery,
    ...queryString.parse(location.search),
  });
  const navigate = useNavigate();
  const ticketCollection = useSelector(getTicketCollection);

  useEffect(() => {
    navigate(`?${queryString.stringify(query)}`);
  }, [query]);

  const onChange = (filter: TQueryParams) => {
    setQuery((state) => ({
      ...state,
      ...filter,
    }));
  };

  return (
    <Paper elevation={3}>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>
      {ticketCollection && (
        ticketCollection.slice(
          +query.page * +query.perPage,
          (+query.page * +query.perPage) + +query.perPage,
        ).map((ticket) => (
          <TicketPreview key={ticket.id} ticket={ticket} />
        ))
      )}

      <Pagination
        page={+query.page}
        perPage={+query.perPage}
        handleChange={onChange}
        total={total}
      />
    </Paper>
  );
}
