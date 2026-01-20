// Middleware para manejar errores no encontrados (404)
const notFound = (req, res, next) => {
    const error = new Error(`No encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = notFound;
