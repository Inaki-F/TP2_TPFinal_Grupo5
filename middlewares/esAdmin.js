export const esAdmin = (req, res, next) => {
    let puedoPasar = false;
    if (req.autenticar && req.autenticar.roleId === 1) {
    puedoPasar = true;
    }
    if (puedoPasar) {
    next();
    } else {
    res.status(403).json({ error: "Acceso denegado: Se requieren permisos de administrador" });
    }
};