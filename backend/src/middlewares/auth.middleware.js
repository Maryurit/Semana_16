const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { pool } = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado. Debes iniciar sesión'
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    
    // Verificar que el usuario existe y está activo
    const [users] = await pool.query(
      'SELECT id_usuario, email, rol, activo FROM usuarios WHERE id_usuario = ?',
      [decoded.id]
    );

    if (users.length === 0 || !users[0].activo) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autorizado'
      });
    }

    req.user = {
      id: users[0].id_usuario,
      email: users[0].email,
      rol: users[0].rol
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador'
    });
  }
  next();
};

module.exports = { authenticate, isAdmin };
