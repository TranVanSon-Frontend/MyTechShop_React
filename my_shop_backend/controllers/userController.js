const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Tên người dùng hoặc email đã tồn tại!' });
    }
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

exports.login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
  
    try {
      // Kiểm tra username hoặc email
      console.log('Đang tìm user với:', usernameOrEmail);
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
  
      if (!user) {
        console.log('User không tồn tại!');
        return res.status(400).json({ message: 'Sai thông tin đăng nhập!' });
      }
  
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Mật khẩu không chính xác!');
        return res.status(400).json({ message: 'Sai thông tin đăng nhập!' });
      }
  
      // Tạo JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, 'secretKey', {
        expiresIn: '1h',
      });
  
      console.log('Đăng nhập thành công!');
      res.status(200).json({ message: 'Đăng nhập thành công!', token, id: user._id });
    } catch (error) {
      console.error('Lỗi server:', error);
      res.status(500).json({ message: 'Lỗi server!' });
    }
  };
  
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Trả về tất cả thông tin của user, bao gồm cả password
      res.status(200).json({ message: 'Lấy danh sách người dùng thành công!', users });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server!', error });
    }
  };
  