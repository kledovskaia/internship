import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { debounce, encode } from '../utils/utils';

const defaultQuery = {
  perPage: '8',
  page: '0',
};

export const useQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState<TQueryParams>();

  useEffect(() => {
    const queryObj = queryString.parse(location.search, { decode: false });
    setQuery({
      ...defaultQuery,
      ...queryObj,
    });
  }, []);

  useEffect(() => {
    if (!query) return;
    navigate(`?${queryString.stringify(query, { encode: false })}`);
  }, [query]);

  const updateQuery = useCallback((name: string, value?: number | string) => {
    if (value === undefined || value === '') {
      setQuery(
        (state) => Object.fromEntries(Object.entries(state).filter(([key]) => key !== name)),
      );
      return;
    }
    if (name === 'search') {
      setQuery((state) => ({
        ...state,
        [name]: encode(value.toString()),
        page: '0',
      }));
      return;
    }
    setQuery((state) => ({
      ...state,
      [name]: value.toString(),
    }));
  }, []);
  const updateQueryWithDebounce = useCallback(debounce(updateQuery, 400), []);

  return { query, updateQuery, updateQueryWithDebounce };
};
