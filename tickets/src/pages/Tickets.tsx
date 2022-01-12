import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Paper } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import queryString from 'query-string';
import { getTicketCollection } from '../redux/selectors';
import TicketPreview from '../components/TicketPreview/TicketPreview';

const defaultQuery = {
  perPage: '4',
  page: '0',
};

export default function Tickets() {
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
  const nextPage = useCallback(() => {
    setQuery(((state) => ({
      ...state,
      page: (+state.page + 1).toString(),
    })));
  }, [query]);
  const prevPage = useCallback(() => {
    setQuery(((state) => ({
      ...state,
      page: (+state.page - 1).toString(),
    })));
  }, [query]);

  return (
    <Paper elevation={3}>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>
      {ticketCollection && (
      <>
        {ticketCollection.slice(
          +query.page * +query.perPage,
          (+query.page * +query.perPage) + +query.perPage,
        ).map((ticket) => (
          <TicketPreview key={ticket.id} ticket={ticket} />
        ))}
        <button onClick={() => +query.page > 0 && prevPage()} disabled={+query.page <= 0} type="button">PrevPage</button>
        <button
          onClick={
          () => ticketCollection.length > ((+query.page + 1) * +query.perPage) && nextPage()
        }
          disabled={ticketCollection.length <= ((+query.page + 1) * +query.perPage)}
          type="button"
        >
          NextPage

        </button>
      </>
      )}
      <select
        name="perPage"
        onChange={(e) => onChange({
          [e.target.name]: e.target.value,
        })}
      >
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>

    </Paper>
  );
}
