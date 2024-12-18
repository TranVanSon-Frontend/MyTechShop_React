import axios from 'axios'; // Import axios

const API_URL = "http://localhost:3000/api/products";

class ProductService {
  static async getAllProducts(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit, ...filters };
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async createProduct(productData) {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  // Lấy thông tin sản phẩm theo ID
  static async getProductById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  }
}

export default ProductService;
