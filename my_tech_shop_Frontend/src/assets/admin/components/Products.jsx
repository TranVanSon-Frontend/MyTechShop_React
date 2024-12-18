import React, { useEffect, useState } from 'react';
import productService from '../service/ProductsService';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await productService.getAllProducts();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await productService.deleteProduct(id);
    fetchProducts(); // Refresh list
  };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Quản lý Sản phẩm</h2>
      <table className='table table-striped table-bordered'>
        <thead className="thead-dark">
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => deleteProduct(product._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
