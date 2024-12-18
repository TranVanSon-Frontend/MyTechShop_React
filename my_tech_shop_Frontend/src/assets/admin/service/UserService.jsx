import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data); // Kiểm tra dữ liệu trả về
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
    }
  };
  

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getAllUsers, deleteUser };
