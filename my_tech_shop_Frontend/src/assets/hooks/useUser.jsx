// src/hooks/useUser.jsx

import { useState } from 'react';
import UserService from '../services/UserService'; // Giả sử bạn đã tạo userService

const useUser = () => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng sau khi đăng nhập
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Đăng ký
  const register = async (email, password, username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.registerUser({ email, password, username });
      setUser(response.user); // Lưu thông tin người dùng sau khi đăng ký thành công
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra');
      throw err;
    }
  };

  // Đăng nhập
  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.loginUser({ usernameOrEmail, password });
      setUser(response.user); // Lưu thông tin người dùng sau khi đăng nhập thành công
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra');
      throw err;
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout
  };
};

export default useUser;
