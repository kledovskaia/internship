import { Input } from '@mui/material';
import {
  useEffect, useState,
} from 'react';

type Props = {
  handleChange: (name: string, value: unknown) => void
}

export function Search({ handleChange }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleChange('search', search);
  }, [search]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
