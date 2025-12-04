const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const { requestLogger, devLogger } = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const routes = require('./routes');

const app = express();

// Configurar CORS - Permitir todos los orígenes en desarrollo
const corsOptions = {
  origin: env.NODE_ENV === 'production' ? env.FRONTEND_URL : '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde'
  }
});

// Middlewares de seguridad
app.use(helmet());
app.use(cors(corsOptions));

// Middlewares de logging
app.use(requestLogger);
app.use(devLogger);

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para rate limiting
app.use('/api/', limiter);

// Configurar morgan para logging HTTP
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rutas de la API
app.use('/api', routes);

// Middleware para manejar errores 404
app.use(errorMiddleware.notFound);

// Middleware para manejar errores de JSON
app.use(errorMiddleware.validateJSON);

// Middleware para manejar errores generales
app.use(errorMiddleware.errorHandler);

module.exports = app;