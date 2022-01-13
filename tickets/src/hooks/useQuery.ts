import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { debounce } from '../utils/utils';

const defaultQuery = {
  perPage: '8',
  page: '0',
};

export const useQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState<TQueryParams>({
    ...defaultQuery,
    ...queryString.parse(location.search),
  });

  useEffect(() => {
    navigate(`?${queryString.stringify(query)}`);
  }, [query]);

  const updateQuery = useCallback((name: string, value?: number | string) => {
    if (value === undefined || value === '') {
      setQuery(
        (state) => Object.fromEntries(Object.entries(state).filter(([key]) => key !== name)),
      );
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
