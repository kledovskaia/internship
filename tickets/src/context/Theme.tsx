import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { nanoid } from 'nanoid';
import {
  createContext, ReactNode, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/slices/messages';

const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#E5E5E5',
      },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#24242b',
        paper: '#363740',
      },
    },
  }),
};

export const ThemeContext = createContext(null);

type Props = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const type = localStorage.getItem('tickets-theme') || 'dark';
  const [theme, setTheme] = useState(themes[type as keyof typeof themes]);
  const dispatch = useDispatch();

  const toggleMode = useCallback(() => {
    setTheme((state) => {
      if (state === themes.dark) {
        localStorage.setItem('tickets-theme', 'light');
        return themes.light;
      }
      localStorage.setItem('tickets-theme', 'dark');
      return themes.dark;
    });
    dispatch(addMessage({
      id: nanoid(),
      type: 'success',
      content: 'Theme changed',
    }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={toggleMode}>
        <CssBaseline />
        { children }
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
