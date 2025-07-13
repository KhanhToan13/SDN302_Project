const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

// GET /api/products : Lấy tất cả sản phẩm (công khai)
// POST /api/products : Tạo sản phẩm mới (chỉ admin)
router.route('/')
    .get(getAllProducts)
    .post(protect, admin, createProduct);

// GET /api/products/:id : Lấy một sản phẩm (công khai)
// PUT /api/products/:id : Cập nhật sản phẩm (chỉ admin)
// DELETE /api/products/:id : Xóa sản phẩm (chỉ admin)
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;