import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard"; // Import component ProductCard

const RelatedProducts = ({ currentProductCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!currentProductCategory) {
          throw new Error("Invalid category value");
        }

        const response = await axios.get(
          `http://localhost:3000/api/products?category=${currentProductCategory}&_limit=4`
        );

        setRelatedProducts(response.data);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(err.message || "Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductCategory]);

  if (loading) return <p>Loading related products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-6">
      <h3>Related Products</h3>
      <div className="row">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            title={product.name}
            price={product.price.toLocaleString()} // Format giá
            oldPrice={(product.price / (1 - product.discount / 100)).toLocaleString()} // Giá cũ
            discount={product.discount || 0} // Tỷ lệ giảm giá
            imageUrl={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
