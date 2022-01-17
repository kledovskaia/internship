import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { nanoid } from 'nanoid';
import {
  createContext, ReactNode, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/slices/messages';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#24242b',
      paper: '#363740',
      // paper: '#474853',
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#E5E5E5',
    },
  },
});

export const ThemeContext = createContext(null);

type Props = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState(darkTheme);
  const dispatch = useDispatch();

  const toggleMode = useCallback(() => {
    setTheme((state) => (state === darkTheme ? lightTheme : darkTheme));
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
