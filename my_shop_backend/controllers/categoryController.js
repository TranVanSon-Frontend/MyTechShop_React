const Category = require('../models/category');

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
