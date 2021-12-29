import { useCallback, useLayoutEffect, useState } from 'react';
import { debounce } from '../../helpers/utils';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Button } from '../../styles/common';
import { FilterContainer } from './styles';
import { Search } from '../../icons/Search';
import { selectIssueBoards } from '../../redux/selectors';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const formatted = (string) => string.toLowerCase().replace(/\s+/g, ' ').split(' ');

export const Filter = ({ setFilteredData }) => {
  const [filter, setFilter] = useState('');
  const { projectId } = useParams();
  const issueBoards = useSelector(selectIssueBoards(projectId));

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const filterData = useCallback((filter, data) => {
    if (data && filter) {
      setFilteredData(
        data.map((board) => ({
          ...board,
          items: board.items.filter((issue) =>
            formatted(filter).every((searchWord) => formatted(issue.title).some((word) => word.includes(searchWord)))
          ),
        }))
      );
    } else {
      setFilteredData(null);
    }
  }, []);
  const filterDataWithDebounce = useCallback(debounce(filterData), []);

  useLayoutEffect(() => {
    filterDataWithDebounce(filter, issueBoards);
  }, [filter]);

  useLayoutEffect(() => {
    filterData(filter, issueBoards);
  }, [issueBoards]);

  return (
    <FilterContainer onSubmit={handleSubmit}>
      {/* <TextField size='small' value={filter} onChange={handleChange} /> */}
      <FormControl size="small" variant="outlined">
        <InputLabel htmlFor="search">Search</InputLabel>
        <OutlinedInput
          id="search"
          type="search"
          value={filter}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <IconButton edge="start">
                <Search />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button>Search</Button>
    </FilterContainer>
  );
};
