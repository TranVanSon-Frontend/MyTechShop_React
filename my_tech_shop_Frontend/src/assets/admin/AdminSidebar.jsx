import React from 'react';

const AdminSidebar = ({ setActiveTab }) => {
  return (
    <div className="d-flex flex-column p-3 bg-light border-right" style={{ width: '250px', height: '100vh' }}>
      <h4 className="mb-4 text-center">Quản trị</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className="nav-link btn btn-link text-dark"
            onClick={() => setActiveTab('users')}
          >
            Quản lý Người dùng
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link btn btn-link text-dark"
            onClick={() => setActiveTab('products')}
          >
            Quản lý Sản phẩm
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link btn btn-link text-dark"
            onClick={() => setActiveTab('orders')}
          >
            Quản lý Đơn hàng
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
