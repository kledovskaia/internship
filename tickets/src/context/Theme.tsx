import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createContext, ReactNode, useCallback, useState,
} from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const ThemeContext = createContext(null);

type Props = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState(darkTheme);

  const toggleMode = useCallback(() => {
    setTheme((state) => (state === darkTheme ? lightTheme : darkTheme));
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
