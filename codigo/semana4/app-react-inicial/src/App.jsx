import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState('')

  return (
    <>
      <h1>Lista de Compras</h1>
      <div className="card">
        <div>
          <input onChange={(event) => setNuevoProducto(event.target.value)} type='text' />
        </div>
        <button onClick={() => {
          () => {
            setProductos(productos.push(nuevoProducto))
            console.log(productos)
          }
        }}>
          Agregar Producto
        </button>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
        </ul>
      </div>

    </>
  )
}

export default App
