const jwt = require('jsonwebtoken');

// Middleware para verificar autenticación mediante JWT
const autenticar = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: 'No autorizado. Token no proporcionado.' 
        });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregar información del usuario a la petición
        req.usuario = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ 
            error: 'Token inválido o expirado.' 
        });
    }
};

// Middleware para verificar roles específicos
const autorizarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ 
                error: 'No autenticado.' 
            });
        }
        
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                error: 'No tienes permisos para realizar esta acción.' 
            });
        }
        
        next();
    };
};

module.exports = { autenticar, autorizarRol };
