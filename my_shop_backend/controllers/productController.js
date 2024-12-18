const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const mongoose = require('mongoose');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm sản phẩm theo ID và populate danh mục và thương hiệu
    const product = await Product.findById(id)
      .populate('category', 'name') // Lấy tên danh mục
      .populate('brand', 'name'); // Lấy tên thương hiệu

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  const { name, category: categoryId, brand: brandId, price, discount, hot, views, image, techDetails } = req.body;

  try {
    // Kiểm tra danh mục
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ message: 'Danh mục không tồn tại' });

    // Kiểm tra thương hiệu
    const brand = await Brand.findById(brandId);
    if (!brand) return res.status(400).json({ message: 'Thương hiệu không tồn tại' });

    // Tạo sản phẩm
    const product = new Product({
      name,
      category: category._id,
      brand: brand._id,
      price,
      discount,
      hot,
      views,
      image,
      techDetails,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách sản phẩm có thông tin danh mục và thương hiệu
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name') // Lấy thông tin tên danh mục
      .populate('brand', 'name') // Lấy thông tin tên thương hiệu
      .select('-__v'); // Loại bỏ trường __v (nếu cần)

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category, _limit } = req.query; // Lấy tham số từ query string
    const limit = parseInt(_limit) || 10; // Default limit là 10 nếu không có trong query

    // Trường hợp không có category, trả về tất cả sản phẩm
    let query = {};
    if (category) {
      // Nếu có category, chuyển category từ string thành ObjectId
      const categoryObjectId = new mongoose.Types.ObjectId(category);
      query.category = categoryObjectId;
    }

    // Truy vấn vào cơ sở dữ liệu để tìm sản phẩm theo category (hoặc tất cả sản phẩm nếu không có category)
    const products = await Product.find(query)
      .populate('category', 'name') // Lấy thông tin tên danh mục
      .populate('brand', 'name') // Lấy thông tin tên thương hiệu
      .select('-__v') // Loại bỏ trường __v (nếu cần)
      .limit(limit)
      .exec();

    // Kiểm tra nếu không có sản phẩm nào
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Trả về danh sách sản phẩm
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


