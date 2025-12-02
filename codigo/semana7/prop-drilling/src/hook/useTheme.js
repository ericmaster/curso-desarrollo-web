import {useState} from 'react';

// useTheme.js - Custom hook para manejar el estado del tema
export function useTheme() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const toggleTema = () => setModoOscuro(!modoOscuro);

  return { modoOscuro, toggleTema };
}