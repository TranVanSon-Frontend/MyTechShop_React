import React from "react";

const Banner = () => {
  return (
    <div className="container-fluid mt-4" style={{ height: "400px" }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <img 
            src="https://dienthoaigiakho.vn/_next/image?url=https%3A%2F%2Fcdn.dienthoaigiakho.vn%2Fphotos%2F1733902197775-984x395_Main-Banner-min.jpg&w=1080&q=75" 
            className="img-fluid rounded w-100 h-100" 
            alt="Banner chính" 
            style={{ objectFit: "cover" }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
