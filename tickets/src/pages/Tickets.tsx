import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import queryString from 'query-string';
import { getTicketCollection } from '../redux/selectors';
import TicketPreview from '../components/TicketPreview/TicketPreview';

const defaultQuery = {
  perPage: '8',
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

  return (
    <Paper elevation={3}>
      <h1>Tickets</h1>
      <Link to="/tickets/new">New Ticket</Link>
      {ticketCollection?.map((ticket) => (
        <TicketPreview key={ticket.id} ticket={ticket} />
      ))}
      <select
        name="perPage"
        onChange={(e) => onChange({
          [e.target.name]: e.target.value,
        })}
      >
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="64">64</option>
      </select>
    </Paper>
  );
}
