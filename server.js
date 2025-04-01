require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
// const { User } = require('./models');
const routes = require('./routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use('/', routes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR 💥', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});