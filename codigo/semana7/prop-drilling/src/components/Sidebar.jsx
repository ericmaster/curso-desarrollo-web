import ThemeToggler from './ThemeToggler'
import { useThemeContext } from '../context/ThemeContext';

// Sidebar.jsx - Nivel 2 de prop drilling
// Recibe modoOscuro y toggleTema de Layout
// y los pasa a ThemeToggler
function Sidebar() {
  const { modoOscuro } = useThemeContext();
  return (
    <aside className="sidebar">
      <h3>Barra Lateral</h3>
      <p>
        El componente <code>Sidebar</code> también recibe las props 
        solo para pasarlas a <code>ThemeToggler</code>.
      </p>
      <div className="props-info">
        <h4>Props recibidas en Sidebar:</h4>
        <ul>
          <li><strong>modoOscuro:</strong> {modoOscuro ? 'true' : 'false'}</li>
          <li><strong>toggleTema:</strong> función</li>
        </ul>
      </div>
      <ThemeToggler/>
    </aside>
  );
}

export default Sidebar
