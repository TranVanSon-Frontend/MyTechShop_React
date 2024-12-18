const Cart = require('../models/cart');

const mongoose = require('mongoose');


// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    const { userId } = req.params; // Lấy userId từ path parameter
  
    try {
      const cart = await getOrCreateCart(userId); // Hàm xử lý giỏ hàng
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      res.status(200).json(cart); // Trả về giỏ hàng nếu tìm thấy
    } catch (error) {
      console.error("Error fetching cart:", error); // Log lỗi chi tiết
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  };
  



// Lấy hoặc tạo giỏ hàng
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [], total: 0 });
  }
  return cart;
};

exports.addProductToCart = async (req, res) => {
    const { productId, name, price, image, color, version, quantity, userId } = req.body;
  
    // Kiểm tra dữ liệu bắt buộc
    if (!productId || !name || !price || !image || !color || !version || !quantity || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    try {
      // Lấy hoặc tạo giỏ hàng dựa trên userId
      const cart = await getOrCreateCart(userId);
  
      // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const existingItem = cart.items.find(
        (item) => 
          item.productId === productId && 
          item.color === color && 
          item.version === version
      );
  
      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại
        existingItem.quantity += quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        cart.items.push({ productId, name, price, image, color, version, quantity });
      }
  
      // Tính lại tổng giá trị giỏ hàng
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
      await cart.save();
  
      res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add product to cart" });
    }
  };
  
  exports.updateCartItem = async (req, res) => {
    const { itemId, quantity } = req.body;  // Accept itemId and quantity in the request body
  
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than zero' });
    }
  
    try {
      // Retrieve or create the cart for the user
      const cart = await getOrCreateCart(req.user._id);
  
      // Find the item by itemId
      const item = cart.items.find((item) => item._id.toString() === itemId);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      // Update the quantity of the found item
      item.quantity = quantity;
  
      // Recalculate the total price of the cart
      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: 'Failed to update cart' });
    }
  };
  


exports.removeCartItem = async (req, res) => {
  const { userId, itemId } = req.body; // Get the userId and itemId (not productId)

  if (!userId || !itemId) {
    return res.status(400).json({ error: "Missing userId or itemId" });
  }

  try {
    // Chuyển userId thành ObjectId hợp lệ
    const validUserId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({ userId: validUserId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Lọc sản phẩm ra khỏi giỏ hàng dựa trên itemId
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId); // Use item._id for removal
    cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0); // Recalculate total price

    await cart.save();

    res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error("Error removing item:", error.message);
    res.status(500).json({ error: "Failed to remove product" });
  }
};

// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
