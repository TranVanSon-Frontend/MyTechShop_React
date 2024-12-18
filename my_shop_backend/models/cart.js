const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết với mô hình User
  items: [
    {
      productId: { type: String, required: true }, // Bạn có thể thay đổi thành ObjectId nếu liên kết với Product
      name: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      color:{type: String,required:true},
      version:{type: String, required:true}
    },
  ],
  total: { type: Number, required: true },
}, { timestamps: true }); // Tự động thêm trường createdAt và updatedAt

module.exports = mongoose.model('Cart', CartSchema);
