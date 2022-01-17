import {
  FormControl, IconButton, InputAdornment, OutlinedInput,
} from '@mui/material';
import {
  useEffect, useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { Label } from './styles';

type Props = {
  handleChange: (name: string, value: unknown) => void,
  initialValue?: string
}

export function Search({ handleChange, initialValue }: Props) {
  const [search, setSearch] = useState(initialValue || '');

  useEffect(() => {
    handleChange('search', search);
  }, [search]);

  return (
    <FormControl size="medium" variant="outlined">
      <Label htmlFor="search">Search tickets</Label>
      <OutlinedInput
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={(
          <InputAdornment position="start">
            <IconButton edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
    )}
        label="Password"
      />
    </FormControl>
  );
}
