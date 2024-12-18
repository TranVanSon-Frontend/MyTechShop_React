import React, { useEffect, useState } from "react";
import axios from "axios";


const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        setCategories(response.data); // Cập nhật danh mục từ API
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  

  return (
    <div className="container mt-4" style={{ position: "relative" }}>
      <div className="row">
        <div className="h-auto">
          <div className="list-group" style={{ position: "sticky", top: 0 }}>
            <h3>Danh mục</h3>
            {categories.map((category) => (
              <button
                key={category._id}
                className="list-group-item list-group-item-action"
                
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
