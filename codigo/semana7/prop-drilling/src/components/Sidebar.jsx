import ThemeToggler from './ThemeToggler'

// Sidebar.jsx - Nivel 2 de prop drilling
// Recibe modoOscuro y toggleTema de Layout
// y los pasa a ThemeToggler
function Sidebar({ modoOscuro, toggleTema }) {
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
      <ThemeToggler modoOscuro={modoOscuro} toggleTema={toggleTema} />
    </aside>
  );
}

export default Sidebar
