import { useState, useEffect } from 'react';

function DetallePost() {
  const [post, setPost] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // PASO 6: Obtener el ID del post desde los parámetros de la URL
  // TODO: Usar useParams de react-router-dom
  const postId = null; // Placeholder

  useEffect(() => {
    const cargarDetalles = async () => {
      try {
        setCargando(true);
        
        // PASO 7: Cargar el post
        // TODO: Fetch a https://jsonplaceholder.typicode.com/posts/{postId}
        
        // PASO 8: Cargar el usuario del post
        // TODO: Fetch a https://jsonplaceholder.typicode.com/users/{post.userId}
        
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    if (postId) {
      cargarDetalles();
    }
  }, [postId]);

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return <div className="error">Post no encontrado</div>;
  }

  return (
    <div className="detalle-container">
      {/* PASO 9: Agregar Link/botón para volver a la lista */}
      <button className="boton-volver">← Volver a la lista</button>
      
      <div className="detalle-post">
        <h2>{post.title}</h2>
        
        {usuario && (
          <div className="autor">
            <strong>Autor:</strong> {usuario.name} ({usuario.email})
          </div>
        )}
        
        <div className="contenido">
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;
