import { InputLabel } from '@mui/material';
import { styled } from '@mui/system';

export const Label = styled(InputLabel)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '0 0.6em 0 0.25em',
}));
