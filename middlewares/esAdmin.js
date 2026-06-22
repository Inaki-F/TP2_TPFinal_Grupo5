function esAdmin(req, res, next) {
    let puedePasar = false;
    let statusError = 403;
    let mensajeError = "No tiene permisos para realizar esta acción";
    if (req.autenticar && req.autenticar.roleId === 1) {
        puedePasar = true;
    }
    if (puedePasar) {
        next();
    } else {
        res.status(statusError).json({error: mensajeError});
    }
}

export default esAdmin;