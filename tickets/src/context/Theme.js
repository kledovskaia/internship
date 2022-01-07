import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useCallback, useState } from "react";

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

const themes = {
  dark: darkTheme,
  light: lightTheme,
}

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark')
  
  const toggleMode = useCallback(() => setMode(state => state === 'dark' ? 'light' : 'dark'), []);

  return (
    <ThemeProvider theme={themes[mode]}>
      <ThemeContext.Provider value={toggleMode}>
        <CssBaseline />
        { children }
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}