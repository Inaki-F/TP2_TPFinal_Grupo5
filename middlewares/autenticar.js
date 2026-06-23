import {verifyToken} from "../utils/jwt.js";

function autenticar(req, res, next) {
    let puedoPasar = false;
    let statusError = 401;
    let mensajeError = "No autorizado: No se encontró el token";
    try {
        const {payload} = req.cookies;
        if (payload) {
            const decoded = verifyToken(payload);
            req.autenticar = decoded;
            puedoPasar = true;
        }
    } catch (error) {
        statusError = 403;
        mensajeError = "Token inválido o expirado";
    }
    if (puedoPasar) {
        next();
    } else {
        res.status(statusError).json({ error: mensajeError });
    }
}

export default autenticar;