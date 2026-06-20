export const validateIdParam = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID inválido: debe ser un número entero' 
    });
  }
  req.id = parseInt(id);
  next();
};