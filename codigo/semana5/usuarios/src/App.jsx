import { useState, useEffect } from 'react'
import './App.css'

function App() {
  //   const usuarios = [{
  //     id: 1,
  //     name: 'Usuario1',
  //     email: 'usuario1@test.com'
  //   },
  //   {
  //     id: 2,
  //     name: 'Usuario2',
  //     email: 'usuario2@test.com'
  //   },
  //   {
  //     id: 3,
  //     name: 'Usuario3',
  //     email: 'usuario3@test.com'
  //   },
  // ]
  const [usuarios, setUsuarios] = useState([])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
      const response = await fetch(url);
      if (response.ok === true) {
        // console.log(response.json())
        setUsuarios(await response.json())
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [])

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => {
          return <li key={usuario.id}>
            <h2><strong>Nombre: </strong> {usuario.name}</h2>
            <p><strong>correo:</strong> {usuario.email}</p>
          </li>
        })}
      </ul>
    </>
  )
}

export default App
