import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getAllProducts, deleteProduct };
