import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => (
  <ul className="nav nav-pills mb-3" role="tablist">
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${activeTab === "login" ? "active" : ""}`}
        onClick={() => setActiveTab("login")}
      >
        Đăng nhập
      </button>
    </li>
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${activeTab === "register" ? "active" : ""}`}
        onClick={() => setActiveTab("register")}
      >
        Đăng ký
      </button>
    </li>
  </ul>
);

export default Tabs;
