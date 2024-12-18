import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ title, price, oldPrice, discount, imageUrl, productId }) => {
  return (
    <div className="col-md-4 mb-3 p-1">
      <div className="card position-relative">
        <div className="badge bg-danger text-white position-absolute top-0 start-0 p-2">
          <span className="p-0 m-0 fs-6">-{discount}%</span>
        </div>
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={title} 
          style={{ height: '250px', objectFit: 'cover' }} 
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-danger d-flex">
            Giá: {price} <span className="text-decoration-line-through text-muted px-1">{oldPrice}</span>
          </p>
          <p className="card-text text-muted">Giảm giá: {discount}%</p>
          <div className="d-flex justify-content-between align-items-center">
            {/* Link wrapped around the button */}
            <Link to={`/products/${productId}`} className="btn btn-primary">
              Xem chi tiết
            </Link>
            <button className="btn btn-light">
              <i className="fa fa-cart-plus"></i> {/* Icon xe đẩy từ Font Awesome */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
