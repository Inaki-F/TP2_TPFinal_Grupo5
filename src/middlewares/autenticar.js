function autenticar(req, res, next) {

  const apiKey = req.headers["clave-secreta"];

  if (apiKey === "mi-clave-secreta") {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
}

module.exports = autenticar;