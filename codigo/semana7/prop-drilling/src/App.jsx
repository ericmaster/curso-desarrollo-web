import { useState } from 'react'
import Layout from './components/Layout'
import './App.css'

// App.jsx - Componente principal
// El estado del tema se define aquí y se pasa hacia abajo
// a través de múltiples niveles de componentes (prop drilling)
function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [paleta, setPaleta] = useState('azul');
  const toggleTema = () => setModoOscuro(!modoOscuro);

  return (
    <div className="app">
      <h1>Ejemplo de Prop Drilling</h1>
      <p className="descripcion">
        Este ejemplo muestra cómo las props <code>modoOscuro</code> y <code>toggleTema</code> 
        se pasan desde App → Layout → Sidebar → ThemeToggler
      </p>
      <Layout modoOscuro={modoOscuro} toggleTema={toggleTema} />
    </div>
  );
}

export default App
