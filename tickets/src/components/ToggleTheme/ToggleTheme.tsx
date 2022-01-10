import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';

export default function ToggleTheme() {
  const toggleTheme = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
