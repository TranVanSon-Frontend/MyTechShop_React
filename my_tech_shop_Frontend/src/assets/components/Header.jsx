import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Header = () => {
  return (
    <header className="bg-light py-2">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            
            <h1 className="text-danger">RedTech</h1>
          </Link>

          {/* Navbar Menu */}
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Trang chủ</Link> {/* Thay a bằng Link */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Sản phẩm</Link> {/* Thay a bằng Link */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Đăng nhập</Link> {/* Thay a bằng Link */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">Đăng kí</Link> {/* Thay a bằng Link */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account">Tài khoản</Link> {/* Thay a bằng Link */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Giỏ hàng</Link> {/* Thay a bằng Link */}
                </li>
              </ul>
            </div>
          </nav>

          {/* Search Form */}
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Tìm kiếm" />
            <button className="btn btn-outline-success d-flex" type="submit">
              <FaSearch className="mt-1" /> Tìm
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
