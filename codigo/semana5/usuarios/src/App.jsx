import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import Cabecera from './components/Cabecera'
import ListaUsuarios from './components/ListaUsuarios'
import { ThemeProvider } from './context/ThemeContext'


function App() {
  
  return (
    <>
      <ThemeProvider>
        <Cabecera />
        <ListaUsuarios mostrarFiltro={false} />
      </ThemeProvider>
    </>
  )
}

export default App
