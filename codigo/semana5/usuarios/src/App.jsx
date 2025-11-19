import { useState, useEffect, useRef } from 'react'
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
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [inputFiltro, setInputFiltro] = useState('')

  const inputFiltroRef = useRef(null);

  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect( () => {
    const cargarUsuarios = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      // const url = "https://jsonplaceholder.typicode.com/any-not-found-endpoint";
      try {
        await sleep(2000);
        const response = await fetch(url);
        console.log(response)
        if (response.ok === true) {
          setUsuarios(await response.json())
        }else {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message)
        console.error(error.message);
      } finally {
        setCargando(false)
      }
    }
    cargarUsuarios()
  }, [])

  useEffect(() => {
    if (!cargando && inputFiltroRef.current) {
      inputFiltroRef.current.focus();
    }
  }, [cargando]);

  const filterHandler = useCallback(
    (usuario) => {
      return usuario.name.toLowerCase().includes(inputFiltro.toLowerCase()) ||
      usuario.email.toLowerCase().includes(inputFiltro.toLowerCase())
    },
    // usuario =>  usuario.name.toLowerCase().includes(inputFiltro.toLowerCase()) || 
    // usuario.email.toLowerCase().includes(inputFiltro.toLowerCase()),
    [inputFiltro]
  );

  const usuariosFiltrados = usuarios.filter(filterHandler);

  if (cargando) return <h2>Cargando...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <input
        ref={inputFiltroRef}
        className='filtro'
        onChange={(e) => { setInputFiltro(e.target.value) }}>
      </input>
      <ul>
        {usuariosFiltrados.map((usuario) => {
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
