import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './componentes/producto'

function App() {
  /**
   *  producto = {
   *    id: 10,
   *    nombre: 'Arroz',
   *    comprado: false,
   *  }
   */
  const [productos, setProductos] = useState([]) // Array de (strings) objetos
  const [nuevoProducto, setNuevoProducto] = useState('')

  const agregarProducto = () => {
    productos.push({ id: Date.now(), nombre: nuevoProducto, comprado: false })
    setProductos(productos)
    setNuevoProducto('')
    // console.log(productos)
  }

  const saveHandler = (id, nuevoNombre) => {
    setProductos(productos.map(producto => {
      if (producto.id === id) {
        producto.nombre = nuevoNombre
      }
      return producto
    }))
  }

  const cambiarComprado = (id) => {
    let productosActualizados = productos.map(
      (producto) => {
        // producto.id === id ? {...producto, comprado: !producto.comprado} : producto
        if (producto.id === id) {
          return { ...producto, comprado: !producto.comprado }
        }
        else {
          return producto
        }
      }
    )
    setProductos(productosActualizados)
  }

  const deleteHandler = (id) => {
    let productosActualizados = productos.filter((producto) => id != producto.id )
    setProductos(productosActualizados)
  }

  return (
    <>
      <h1>Mi Lista de Compras</h1>
      <div className="card">
        <div>
          <input
            onChange={(event) => setNuevoProducto(event.target.value)} type='text'
            onKeyDown={(event) => {
              if (event.key === 'Enter') { // Si es ENTER
                agregarProducto()
              }
            }}
            value={nuevoProducto}
          />
        </div>
        <button onClick={agregarProducto}>
          Agregar Producto
        </button>
        <ul>
          {productos.map((producto) => {
            return <Product
              clickHandler={cambiarComprado}
              deleteHandler={deleteHandler}
              saveHandler={saveHandler}
              key={producto.id}
              producto={producto}></Product>
          })}
        </ul>
      </div>

    </>
  )
}

export default App
