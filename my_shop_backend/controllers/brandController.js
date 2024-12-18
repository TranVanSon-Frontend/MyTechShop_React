const Brand = require('../models/brand');

// Lấy tất cả thương hiệu
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo thương hiệu mới
exports.createBrand = async (req, res) => {
  const { name, description } = req.body;
  const brand = new Brand({ name, description });

  try {
    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
