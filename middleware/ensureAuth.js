function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No autorizado. Por favor inicia sesión con GitHub.' });
}

module.exports = ensureAuth;
