import React from "react";
import ProductDetails from "./ProductDetails"; // Import ProductDetails component
import RelatedProducts from "./RelatedProducts"; // Optional, if you want related products

const ProductDetailPage = ({ products }) => {
  return (
    <div className="container py-5">
      <ProductDetails />

    
    </div>
  );
};

export default ProductDetailPage;
