export const esEmpleado = (req, res, next) => {
    let puedoPasar = false;
    if (req.user && (req.user.roleId === 3 || req.user.roleId === 1)) {
    puedoPasar = true;
    }
    if (puedoPasar) {
    next();
    } else {
    res.status(403).json({ error: "Acceso denegado: Se requieren permisos de empleado o superior" });
    }
};