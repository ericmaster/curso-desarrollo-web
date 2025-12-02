import Sidebar from './Sidebar'
import { useThemeContext } from '../context/ThemeContext';

// Layout.jsx - Nivel 1 de prop drilling
// Recibe modoOscuro y toggleTema de App
// y los pasa a Sidebar (aunque Layout no los usa directamente)
function Layout() {
  const { modoOscuro } = useThemeContext();
  return (
    <div className={`layout ${modoOscuro ? 'dark' : 'light'}`}>
      <main className="main-content">
        <h2>Contenido Principal</h2>
        <p>
          El componente <code>Layout</code> recibe las props pero solo las pasa 
          a <code>Sidebar</code>. Este es el problema del prop drilling.
        </p>
        <div className="props-info">
          <h3>Props recibidas en Layout:</h3>
          <ul>
            <li><strong>modoOscuro:</strong> {modoOscuro ? 'true' : 'false'}</li>
            <li><strong>toggleTema:</strong> función</li>
          </ul>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

export default Layout
