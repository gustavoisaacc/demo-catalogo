export const Validated = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Validación del esquema
    next(); // Continúa si la validación es exitosa
  } catch (error) {
    // Maneja errores de validación
    return error.issues.map((err) => ({
      menssage: err.message,
      path: err.path,
    }));
  }
  return;
};
