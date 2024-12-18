import React from "react";
import Header from "../../components/Header";
import Navbar from "./Navbar";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import ProductList from "./ProductList";
const Home = () => {
  return (
    <body >
         
      <Banner />
      <div className="container">
      <div className="row d-flex ">
        <div className="col-md-3"><Navbar /></div>
        <div className="col-md-9"><div className="container mt-4">
        <div className="row">
          <h4 className="text-danger">Sản phẩm Hot</h4>
          <ProductList/>
          {/* Thêm các ProductCard khác */}
        </div>
      </div>
      </div>
      </div>
      </div>
      
      
    </body>
  );
};

export default Home;
