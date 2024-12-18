const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullname: String,
  address: String,
  phone: String,
  email: String,
  payment: { type: String, default: "cod" }, // cod (cash on delivery) or online
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: { type: String, default: "pending" }, // pending, completed, canceled
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
