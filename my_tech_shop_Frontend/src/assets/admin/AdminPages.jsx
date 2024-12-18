import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Users from './components/User';
import Products from './components/Products';
import Orders from './components/Order';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <Users />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="row">
    <div className="admin-page col-md-2">
      <AdminSidebar setActiveTab={setActiveTab} />
      
    </div>
    <div className="admin-content col-md-10">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;
