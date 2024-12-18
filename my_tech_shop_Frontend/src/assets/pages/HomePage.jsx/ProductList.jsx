import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ProductService from "../../services/ProductService";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Lấy danh sách sản phẩm từ ProductService
  const fetchProducts = async () => {
    try {
      setLoading(true); // Hiển thị loading
      const data = await ProductService.getAllProducts(); // Gọi API từ ProductService
      setProducts(data); // Lưu danh sách sản phẩm vào state
    } catch (err) {
      setError(err.message); // Lưu lỗi nếu xảy ra
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  useEffect(() => {
    fetchProducts(); // Gọi hàm fetch sản phẩm khi component được mount
  }, []);

  if (loading) return <div>Đang tải sản phẩm...</div>; // Hiển thị loading
  if (error) return <div>Lỗi: {error}</div>; // Hiển thị lỗi nếu có

  return (
    <div className="row ">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            title={product.name}
            price={product.price.toLocaleString()} // Định dạng số
            oldPrice={(product.price * (100 + product.discount) / 100).toLocaleString()} // Giá trước giảm
            discount={product.discount}
            imageUrl={product.image}
            productId={product._id} 
          />
        ))}
      </div>
  );
};

export default ProductList;
