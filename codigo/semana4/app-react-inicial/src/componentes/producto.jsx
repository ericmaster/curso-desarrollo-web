import { useState } from 'react'

export default function Product({ producto, clickHandler, deleteHandler, saveHandler }) {
    const [editando, setEditando] = useState(false)
    const [nuevoNombre, setNuevoNombre] = useState('')

    const editHandler = () => {
        setEditando(true)
        setNuevoNombre(producto.nombre)
    }

    const guardar = () => {
        saveHandler(producto.id, nuevoNombre)
        setEditando(false)
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            guardar()
        }
        if (e.key === 'Escape') {
            setEditando(false)
        }
    }

    return (
        <li>
            {editando ? (
                <>
                <input type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    onKeyDown={keyDownHandler}></input>
                    <button onClick={() => guardar()}>Guardar</button>
                    </>
            ) : (
                <>
                    <div onClick={() => clickHandler(producto.id)}>
                        {producto.nombre}
                        {producto.comprado ? 'Comprado' : 'Pendiente'}

                    </div>
                    <button onClick={() => editHandler()}>Editar</button>
                </>
            )}
            <button onClick={() => deleteHandler(producto.id)}>Borrar</button>
        </li>
    )
}