const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
}, { timestamps: true });


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;