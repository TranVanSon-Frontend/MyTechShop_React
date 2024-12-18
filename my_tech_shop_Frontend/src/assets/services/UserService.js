import axios from 'axios'; // Import axios

const API_URL = "http://localhost:3000/api/users";

class UserService {
  // Đăng ký người dùng
  static async registerUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/resigiser`, userData);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Đăng nhập người dùng
  static async loginUser(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // Trả về dữ liệu từ API (token, user info, v.v.)
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  // Lấy thông tin người dùng theo ID
  static async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Trả về thông tin người dùng
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  }

  // Cập nhật thông tin người dùng
  static async updateUser(id, userData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data; // Trả về dữ liệu sau khi cập nhật
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  }

  // Xóa người dùng theo ID
  static async deleteUser(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Trả về thông báo xóa thành công
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
}

export default UserService;
