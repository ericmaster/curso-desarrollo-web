import { createContext, useContext } from 'react';
import { useTheme } from '../hook/useTheme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { modoOscuro, toggleTema } = useTheme();

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default ThemeContext;