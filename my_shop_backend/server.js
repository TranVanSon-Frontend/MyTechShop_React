const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const brandRoutes = require('./routes/brand');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require("./routes/order");
const app = express();
const cors = require('cors');

// Cấu hình CORS
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Đường dẫn tĩnh cho thư mục chứa hình ảnh
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/users',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
// Kết nối MongoDB
mongoose.connect('mongodb+srv://hugiason16:fuUMUwp8H1HTkitC@mongo.c0lwj.mongodb.net/dataReactCv?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => console.log('Đã kết nối MongoDB'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// API trả về đường dẫn tuyệt đối của hình ảnh
app.get('/api/images/:imageName', (req, res) => {
  const imageName = req.params.imageName; // Lấy tên file ảnh từ request
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${imageName}`;
  res.json({ imageUrl });
});

// Lắng nghe cổng
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
