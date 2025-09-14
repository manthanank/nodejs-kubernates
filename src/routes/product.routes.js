// src/routes/product.routes.js
const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const controller = require('../controllers/product.controller');

const router = express.Router();

// Create
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number')
  ],
  validateRequest,
  controller.createProduct
);

// List (with pagination)
router.get('/', controller.getProducts);

// Read one
router.get('/:id', [param('id').isMongoId().withMessage('Invalid product id')], validateRequest, controller.getProductById);

// Update
router.put('/:id', [param('id').isMongoId().withMessage('Invalid product id')], validateRequest, controller.updateProduct);

// Delete
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid product id')], validateRequest, controller.deleteProduct);

module.exports = router;
