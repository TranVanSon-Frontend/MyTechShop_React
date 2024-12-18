const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// Lấy giỏ hàng
router.get('/:userId', cartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post('/add', cartController.addProductToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/update', cartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/remove", cartController.removeCartItem);


// Xóa toàn bộ giỏ hàng
router.delete('/clear', cartController.clearCart);

module.exports = router;
