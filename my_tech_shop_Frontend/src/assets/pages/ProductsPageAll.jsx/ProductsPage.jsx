import React from "react";
import BrandsList from "./BrandsList";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-3">
          <BrandsList />
        </div>
        <div className="col-md-9">
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
