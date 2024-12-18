// src/pages/Login.jsx

import React, { useState } from 'react';
import useUser from '../hooks/useUser'; // Import useUser hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
  const { login, loading, error } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(usernameOrEmail, password);
      console.log('Đăng nhập thành công:', response);
      localStorage.setItem("token", response.token); // Lưu JWT token
      localStorage.setItem("username", usernameOrEmail); 
      localStorage.setItem("userId", response.id);
      // Điều hướng về trang Home sau khi đăng nhập thành công
      navigate('/'); // Đảm bảo rằng bạn đã có route /home trong ứng dụng của bạn
    } catch (err) {
      console.error('Đăng nhập thất bại:', err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usernameOrEmail" className="form-label">Email hoặc Tên người dùng</label>
          <input
            type="text"
            id="usernameOrEmail"
            className="form-control"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default Login;
