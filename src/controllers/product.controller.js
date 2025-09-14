// src/controllers/product.controller.js
const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  const { name, description, price, inStock } = req.body;
  const product = new Product({ name, description, price, inStock });
  await product.save();
  res.status(201).json({ success: true, data: product });
};

exports.getProducts = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1'));
  const limit = Math.min(100, parseInt(req.query.limit || '10'));
  const skip = (page - 1) * limit;

  const [total, products] = await Promise.all([
    Product.countDocuments(),
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  res.json({
    success: true,
    data: products,
    meta: { total, page, limit }
  });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  res.json({ success: true, data: product });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: 'Product not found' });

  res.json({ success: true, data: updated });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });

  res.json({ success: true, message: 'Product deleted' });
};
