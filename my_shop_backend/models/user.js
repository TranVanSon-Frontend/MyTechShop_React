const mongoose = require('mongoose');

// Định nghĩa schema User
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Username không được trùng
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email không được trùng
    match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ'], // Regex kiểm tra định dạng email
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Mật khẩu phải có ít nhất 6 ký tự
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
}, { timestamps: true }); // Tự động thêm thời gian tạo và cập nhật

// Tạo model User
const User = mongoose.model('User', UserSchema);

module.exports = User;
