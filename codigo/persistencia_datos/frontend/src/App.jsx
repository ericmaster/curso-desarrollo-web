import { useState, useEffect } from 'react'

const API_URL = '/api'

function App() {
  const [activeTab, setActiveTab] = useState('usuarios')
  const [usuarios, setUsuarios] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Formulario de usuario
  const [formUsuario, setFormUsuario] = useState({ nombre: '', email: '' })
  const [editingUsuarioId, setEditingUsuarioId] = useState(null)

  // Formulario de post
  const [formPost, setFormPost] = useState({ titulo: '', contenido: '', usuarioId: '' })
  const [editingPostId, setEditingPostId] = useState(null)

  useEffect(() => {
    cargarUsuarios()
    cargarPosts()
  }, [])

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('')
        setSuccess('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/usuarios`)
      const data = await response.json()
      setUsuarios(data)
    } catch (err) {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const cargarPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/posts`)
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError('Error al cargar posts')
    } finally {
      setLoading(false)
    }
  }

  const crearUsuario = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUsuario)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      setSuccess('Usuario creado exitosamente')
      setFormUsuario({ nombre: '', email: '' })
      cargarUsuarios()
    } catch (err) {
      setError(err.message || 'Error al crear usuario')
    }
  }

  const actualizarUsuario = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/usuarios/${editingUsuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUsuario)
      })
      
      if (!response.ok) throw new Error('Error al actualizar')
      
      setSuccess('Usuario actualizado exitosamente')
      setFormUsuario({ nombre: '', email: '' })
      setEditingUsuarioId(null)
      cargarUsuarios()
    } catch (err) {
      setError('Error al actualizar usuario')
    }
  }

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    
    try {
      await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' })
      setSuccess('Usuario eliminado exitosamente')
      cargarUsuarios()
      cargarPosts()
    } catch (err) {
      setError('Error al eliminar usuario')
    }
  }

  const editarUsuario = (usuario) => {
    setFormUsuario({ nombre: usuario.nombre, email: usuario.email })
    setEditingUsuarioId(usuario.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelarEdicionUsuario = () => {
    setFormUsuario({ nombre: '', email: '' })
    setEditingUsuarioId(null)
  }

  const crearPost = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/usuarios/${formPost.usuarioId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: formPost.titulo, contenido: formPost.contenido })
      })
      
      if (!response.ok) throw new Error('Error al crear post')
      
      setSuccess('Post creado exitosamente')
      setFormPost({ titulo: '', contenido: '', usuarioId: '' })
      cargarPosts()
      cargarUsuarios()
    } catch (err) {
      setError('Error al crear post')
    }
  }

  const actualizarPost = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/posts/${editingPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: formPost.titulo, contenido: formPost.contenido })
      })
      
      if (!response.ok) throw new Error('Error al actualizar')
      
      setSuccess('Post actualizado exitosamente')
      setFormPost({ titulo: '', contenido: '', usuarioId: '' })
      setEditingPostId(null)
      cargarPosts()
      cargarUsuarios()
    } catch (err) {
      setError('Error al actualizar post')
    }
  }

  const eliminarPost = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este post?')) return
    
    try {
      await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' })
      setSuccess('Post eliminado exitosamente')
      cargarPosts()
      cargarUsuarios()
    } catch (err) {
      setError('Error al eliminar post')
    }
  }

  const editarPost = (post) => {
    setFormPost({ 
      titulo: post.titulo, 
      contenido: post.contenido, 
      usuarioId: post.usuarioId 
    })
    setEditingPostId(post.id)
    setActiveTab('posts')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelarEdicionPost = () => {
    setFormPost({ titulo: '', contenido: '', usuarioId: '' })
    setEditingPostId(null)
  }

  return (
    <div className="app">
      <div className="header">
        <h1>📊 Persistencia de Datos</h1>
        <p>Ejemplo con PostgreSQL, Sequelize y React</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('usuarios')}
        >
          👥 Usuarios
        </button>
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Posts
        </button>
      </div>

      {activeTab === 'usuarios' && (
        <>
          <div className="form-section">
            <h2>{editingUsuarioId ? '✏️ Editar Usuario' : '➕ Crear Usuario'}</h2>
            <form className="form" onSubmit={editingUsuarioId ? actualizarUsuario : crearUsuario}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={formUsuario.nombre}
                  onChange={(e) => setFormUsuario({ ...formUsuario, nombre: e.target.value })}
                  required
                  placeholder="Ingresa el nombre"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formUsuario.email}
                  onChange={(e) => setFormUsuario({ ...formUsuario, email: e.target.value })}
                  required
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">
                  {editingUsuarioId ? 'Actualizar' : 'Crear'} Usuario
                </button>
                {editingUsuarioId && (
                  <button type="button" className="btn btn-secondary" onClick={cancelarEdicionUsuario}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="list-section">
            <h2>Lista de Usuarios ({usuarios.length})</h2>
            {loading ? (
              <div className="loading">Cargando...</div>
            ) : usuarios.length === 0 ? (
              <div className="empty-state">
                <p>📭 No hay usuarios</p>
                <small>Crea el primer usuario usando el formulario arriba</small>
              </div>
            ) : (
              <div className="items-grid">
                {usuarios.map(usuario => (
                  <div key={usuario.id} className="item-card">
                    <h3>{usuario.nombre}</h3>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p className="meta">ID: {usuario.id}</p>
                    
                    {usuario.posts && usuario.posts.length > 0 && (
                      <div className="posts-list">
                        <h4>Posts de este usuario: ({usuario.posts.length})</h4>
                        {usuario.posts.map(post => (
                          <div key={post.id} className="post-item">
                            <strong>{post.titulo}</strong>
                            <p>{post.contenido?.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="item-actions">
                      <button className="btn btn-edit" onClick={() => editarUsuario(usuario)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => eliminarUsuario(usuario.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'posts' && (
        <>
          <div className="form-section">
            <h2>{editingPostId ? '✏️ Editar Post' : '➕ Crear Post'}</h2>
            <form className="form" onSubmit={editingPostId ? actualizarPost : crearPost}>
              {!editingPostId && (
                <div className="form-group">
                  <label>Usuario Autor:</label>
                  <select
                    value={formPost.usuarioId}
                    onChange={(e) => setFormPost({ ...formPost, usuarioId: e.target.value })}
                    required
                  >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map(usuario => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre} ({usuario.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  value={formPost.titulo}
                  onChange={(e) => setFormPost({ ...formPost, titulo: e.target.value })}
                  required
                  placeholder="Título del post"
                />
              </div>
              <div className="form-group">
                <label>Contenido:</label>
                <textarea
                  value={formPost.contenido}
                  onChange={(e) => setFormPost({ ...formPost, contenido: e.target.value })}
                  placeholder="Escribe el contenido del post..."
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">
                  {editingPostId ? 'Actualizar' : 'Crear'} Post
                </button>
                {editingPostId && (
                  <button type="button" className="btn btn-secondary" onClick={cancelarEdicionPost}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="list-section">
            <h2>Lista de Posts ({posts.length})</h2>
            {loading ? (
              <div className="loading">Cargando...</div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <p>📭 No hay posts</p>
                <small>Crea el primer post usando el formulario arriba</small>
              </div>
            ) : (
              <div className="items-grid">
                {posts.map(post => (
                  <div key={post.id} className="item-card">
                    <h3>{post.titulo}</h3>
                    <p>{post.contenido}</p>
                    {post.autor && (
                      <p><strong>Autor:</strong> {post.autor.nombre} ({post.autor.email})</p>
                    )}
                    <p className="meta">ID: {post.id}</p>
                    
                    <div className="item-actions">
                      <button className="btn btn-edit" onClick={() => editarPost(post)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => eliminarPost(post.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
