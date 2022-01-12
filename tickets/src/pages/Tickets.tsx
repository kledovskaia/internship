import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useEffect, useState,
} from 'react';
import { Paper } from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import queryString from 'query-string';
import { Title1 } from '../styles';
import Pagination from '../components/Pagination/Pagination';
import { getTicketCollection, getTotal } from '../redux/selectors';
import Table from '../components/Table/Table';

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
      <Title1>All tickets</Title1>
      <Link to="/tickets/new">New Ticket</Link>
      <Table
        // rowsCount={+query.perPage}
        tickets={ticketCollection?.slice(
          +query.page * +query.perPage,
          (+query.page * +query.perPage) + +query.perPage,
        )}
      />
      {/* )} */}
      {!!total && (
      <Pagination
        page={+query.page}
        perPage={+query.perPage}
        handleChange={onChange}
        total={total}
      />
      )}

    </Paper>
  );
}
