const express = require("express");
const {getAllOrders, createOrder, getOrdersByUserId } = require("../controllers/orderController");

const router = express.Router();

// Tạo đơn hàng
router.post("/", createOrder);

// Lấy danh sách đơn hàng theo userId
router.get("/:userId", getOrdersByUserId);
router.get('/', getAllOrders);
module.exports = router;

