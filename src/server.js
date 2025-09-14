// src/server.js
require('dotenv').config();
require('express-async-errors'); // auto-catch async errors
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./config/db');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// Error handler
app.use(errorHandler);

// Start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
