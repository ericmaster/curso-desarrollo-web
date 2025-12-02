// ThemeToggler.jsx - Nivel 3 de prop drilling
// Este es el componente que realmente NECESITA las props
// Las props han viajado: App → Layout → Sidebar → ThemeToggler
import { useThemeContext } from "../context/ThemeContext";
  
function ThemeToggler() {
  const { modoOscuro, toggleTema } = useThemeContext();

  return (
    <div className="theme-toggler">
      <h4>Control de Tema</h4>
      <p>
        Este componente finalmente <strong>usa</strong> las props 
        que viajaron 3 niveles hacia abajo.
      </p>
      <button onClick={toggleTema} className="theme-button">
        🌓 Cambiar a {modoOscuro ? 'Claro ☀️' : 'Oscuro 🌙'}
      </button>
      <p className="current-mode">
        Modo actual: <strong>{modoOscuro ? 'Oscuro' : 'Claro'}</strong>
      </p>
    </div>
  );
}

export default ThemeToggler
