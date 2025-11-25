import { useTheme } from "../context/ThemeContext"

export default function Cabecera() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>Mi Aplicación de Usuarios</h1>
      <button onClick={toggleTheme}>
        Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </header>
  )
}