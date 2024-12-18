import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ state truyền vào khi chuyển từ giỏ hàng
  const { cart, total, userId } = state || { cart: [], total: 0, userId: "" };

  const [form, setForm] = useState({
    userId: userId || "", // Sử dụng userId từ state
    fullname: "",
    address: "",
    phone: "",
    email: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: cart,
      total,
    };

    axios
      .post("http://localhost:3000/api/order", orderData)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/cart">Giỏ hàng</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Thanh toán
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-6">
          <h3>Chi tiết sản phẩm</h3>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item._id}
              >
                {item.name}
                <span className="badge bg-primary rounded-pill">
                  {item.price.toLocaleString()} ₫ x {item.quantity}
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Tổng tiền
              <span className="text-danger">{total.toLocaleString()} ₫</span>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Thông tin người nhận</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Địa chỉ nhận hàng</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phương thức thanh toán</label>
              <select
                className="form-select"
                name="payment"
                value={form.payment}
                onChange={handleChange}
                required
              >
                <option value="cod">Thanh toán khi nhận hàng</option>
                <option value="online">Thanh toán online</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Xác nhận thanh toán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
