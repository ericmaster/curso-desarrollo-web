import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';

function FormularioPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const apiClient = axios.create({
    baseURL: 'https://jubilant-zebra-wxvqvvrjw2gjwr-5173.app.github.dev',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Cargar datos del post si estamos editando
  useEffect(() => {
    if (isEditing) {
      const cargarPost = async () => {
        try {
          setCargando(true);
          const respuesta = await apiClient.get(`/api/posts/${id}`);
          setFormData({
            title: respuesta.data.title,
            body: respuesta.data.body,
            userId: respuesta.data.userId
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setCargando(false);
        }
      };
      cargarPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    const url = isEditing 
      ? `/api/posts/${id}` 
      : '/api/posts';
    // const url = `/api/posts${isEditing ? `/${id}` : ''}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      setCargando(true);
      const respuesta = isEditing
        ? await apiClient.put(url, formData)
        : await apiClient.post(url, formData);

      console.log(`Post ${isEditing ? 'actualizado' : 'creado'}:`, respuesta.data);
      
      // Redirigir a la lista de posts
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  const {data: usuarios, cargando: cargandoUsuarios, error: errorUsuarios} = useFetch('/api/users');

  if (cargando && isEditing) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando post...</p>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2>{isEditing ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
      
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      <form onSubmit={manejarEnvio} className="formulario-post">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userId">Usuario:</label>
          {/* <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="form-input"
            min="1"
            required
          /> */}
          {cargandoUsuarios ? (
            <p>Cargando usuarios...</p>
          ) : errorUsuarios ? (
            <p>Error al cargar usuarios: {errorUsuarios}</p>
          ) : (
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuarios && usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={cargando}
          >
            {cargando ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPost;