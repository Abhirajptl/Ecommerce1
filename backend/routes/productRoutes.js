const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product (Admin only)
router.post('/', protect, admin, createProduct);

// Update an existing product (Admin only)
router.put('/:id', protect, admin, updateProduct);

// Delete a product (Admin only)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
