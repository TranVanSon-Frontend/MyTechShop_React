import React, { useEffect, useState } from 'react';
import orderService from '../service/OrderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await orderService.getAllOrders();
    setOrders(data);
  };

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Quản lý Đơn hàng</h2>
      <table className='table table-striped table-bordered'>
        <thead className="thead-dark">
          <tr>
            <th>Tên khách hàng</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.fullname}</td>
              <td>{order.address}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
