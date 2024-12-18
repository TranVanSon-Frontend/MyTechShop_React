const express = require('express');
const { register, login,getAllUsers } = require('../controllers/userController'); // Import các hàm riêng lẻ

const router = express.Router();

// Route đăng ký
router.post('/register', register);

// Route đăng nhập
router.post('/login', login);

router.get('/',getAllUsers);
module.exports = router;
