export const esAutenticado = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ estado: false, mensaje: 'No autenticado' });
    }
    next();
};

export const verificarRol = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
        return res.status(403).json({ estado: false, mensaje: 'No tenés permiso para realizar esta acción' });
    }
    next();
};
