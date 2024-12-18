import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";

const ProductsList = () => {
  const { data: products, loading, error } = useProducts("http://localhost:3000/api/products?category=675c626c46ce455306243b66");

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="row">
      {products.map((product) => (
        
          <ProductCard
            key={product._id}
            title={product.name}
            price={product.price.toLocaleString()}
            oldPrice={(product.price * (100 + product.discount) / 100).toLocaleString()}
            discount={product.discount}
            imageUrl={product.image}
            productId={product._id} // Pass productId to ProductCard
          />
       
      ))}
    </div>
  );
};

export default ProductsList;
