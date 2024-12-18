import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useProductDetail } from "../../hooks/useProductDetail";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Sử dụng để chuyển hướng
  const { product, loading, error } = useProductDetail(id);

  // Danh sách màu sắc và phiên bản
  const colors = [
    { name: "Black", price: 0 },
    { name: "White", price: 0 },
    { name: "Blue", price: 200000 },
  ];
  const versions = ["128GB", "256GB", "512GB"];

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    const selectedColor = document.querySelector("input[name='color']:checked").id;
    const selectedVersion = document.querySelector("input[name='storage']:checked").id;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
  
    const colorIndex = parseInt(selectedColor.replace("color", ""), 10);
    const versionIndex = parseInt(selectedVersion.replace("storage", ""), 10);
  
    const color = colors[colorIndex].name;
    const version = versions[versionIndex];
    const additionalPrice = colors[colorIndex].price;
  
    const finalPrice = product.price + additionalPrice;
  
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      color,
      version,
      quantity,
      userId: localStorage.getItem("userId"), // Lấy userId từ localStorage
    };
  
    fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add product to cart");
        }
        return response.json();
      })
      .then((data) => {
        alert("Product added to cart!"+ `${cartItem.userId}`);
        navigate("/cart");
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("An error occurred while adding the product to the cart.");
      });
  };
  

  return (
    <div className="row">
      {/* Product Image */}
      <div className="col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid rounded" />
      </div>

      {/* Product Info */}
      <div className="col-md-6">
        <h1 className="display-5">{product.name}</h1>
        <p className="text-muted">SKU: {product.sku || "N/A"}</p>

        {/* Pricing */}
        <div>
          <h3 className="text-danger fw-bold">{product.price.toLocaleString()} ₫</h3>
          <p className="text-muted text-decoration-line-through">
            {(product.price * (100 + product.discount) / 100).toLocaleString()} ₫
          </p>
        </div>

        {/* Select Version (Storage) */}
        <div className="mt-4">
          <h5 className="fw-bold">Select Storage</h5>
          <div className="btn-group" role="group">
            {versions.map((version, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  className="btn-check"
                  name="storage"
                  id={`storage${index}`}
                  defaultChecked={index === 0}
                />
                <label className="btn btn-outline-primary" htmlFor={`storage${index}`}>
                  {version}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Select Color */}
        <div className="mt-4">
          <h5 className="fw-bold">Select Color</h5>
          <div className="row">
            {colors.map((color, index) => (
              <div className="col-6 fs-6" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="color"
                    id={`color${index}`}
                    defaultChecked={index === 0}
                  />
                  <label className="form-check-label" htmlFor={`color${index}`}>
                    {color.name} - {color.price.toLocaleString()} ₫
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Offer */}
        <div className="mt-4">
          <h5 className="fw-bold">Upgrade Now</h5>
          <p>
            Trade-in discount up to <strong>{product.discountValue || "0"} ₫</strong>
          </p>
          <h4 className="text-success">
            From: {(product.price - (product.discountValue || 0)).toLocaleString()} ₫
          </h4>
        </div>

        {/* Add to Cart */}
        <div className="d-flex align-items-center mt-4">
          <label htmlFor="quantity" className="me-2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            className="form-control w-25 me-3"
            min="1"
            defaultValue="1"
          />
          <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-3">
        <RelatedProducts currentProductCategory={product.category._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
