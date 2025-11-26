import { useState, useEffect } from 'react';

function ListaPosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // PASO 4: Implementar la llamada a la API
    const cargarPosts = async () => {
      try {
        setCargando(true);
        // TODO: Hacer fetch a https://jsonplaceholder.typicode.com/posts
        // TODO: Convertir respuesta a JSON
        // TODO: Actualizar el estado con setPosts
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPosts();
  }, []);

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando posts...</p>
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

  return (
    <div>
      <h2>📝 Lista de Posts</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {/* PASO 5: Agregar Link de React Router para navegar al detalle */}
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPosts;
