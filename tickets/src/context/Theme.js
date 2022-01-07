import { createTheme, ThemeProvider } from "@mui/system";
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

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = useCallback(() => {
    setTheme(state => state === darkTheme ? lightTheme : darkTheme)
  }, [])
  
  return (
    <ThemeContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}