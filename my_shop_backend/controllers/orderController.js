const Order = require("../models/order");
const Cart = require("../models/cart");

// Tạo đơn hàng
const createOrder = async (req, res) => {
  const { userId, fullname, address, phone, email, payment } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      userId,
      fullname,
      address,
      phone,
      email,
      payment,
      items: cart.items,
      total,
    });

    await order.save();
    await Cart.deleteOne({ userId }); // Xóa giỏ hàng sau khi đặt hàng thành công

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách đơn hàng theo userId
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getOrdersByUserId, getAllOrders };


