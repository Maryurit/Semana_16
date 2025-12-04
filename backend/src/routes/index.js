const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const authorRoutes = require('./author.routes');
const editorialRoutes = require('./editorial.routes');
const bookRoutes = require('./book.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');

// Ruta de salud
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '📖 API Tienda de Libros funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rutas principales
router.use('/usuarios', userRoutes);
router.use('/categorias', categoryRoutes);
router.use('/autores', authorRoutes);
router.use('/editoriales', editorialRoutes);
router.use('/libros', bookRoutes);
router.use('/carrito', cartRoutes);
router.use('/pedidos', orderRoutes);

module.exports = router;