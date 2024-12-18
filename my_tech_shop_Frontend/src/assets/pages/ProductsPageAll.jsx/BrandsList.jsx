import React from "react";
import useProducts from "../../hooks/useProducts";

const BrandsList = () => {
  // Lấy dữ liệu từ API brands thay vì categories
  const { data: brands, loading, error } = useProducts("http://localhost:3000/api/brands");

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-3 shadow rounded">
      <h3>Brands</h3> {/* Tiêu đề là "Brands" */}
      <div className="row">
      {brands.map((brand) => (
        
        <div className="col-md-6 pt-2">
          <button key={brand._id} className="btn btn-outline-secondary btn-custom ">
          {brand.name} {/* Hiển thị tên của thương hiệu */}
        </button></div>
       
      ))}
    </div>
    </div>
  );
};

export default BrandsList;
