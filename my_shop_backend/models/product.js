const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to Category model
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', // Reference to Brand model
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  hot: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  image: {
    type: String, // URL hoặc đường dẫn ảnh
    required: true
  },
  techDetails: {
    screenSize: { type: String }, // Kích thước màn hình (ví dụ: "6.5 inch")
    battery: { type: String }, // Dung lượng pin (ví dụ: "4500mAh")
    camera: { type: String }, // Thông tin camera (ví dụ: "108MP + 12MP + 8MP")
    chipset: { type: String }, // Loại chipset (ví dụ: "Snapdragon 888")
    ram: { type: String }, // Dung lượng RAM (ví dụ: "8GB")
    storage: { type: String }, // Dung lượng bộ nhớ (ví dụ: "128GB")
    operatingSystem: { type: String }, // Hệ điều hành (ví dụ: "Android 13")
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
