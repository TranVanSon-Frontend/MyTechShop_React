import React, { useEffect, useState } from 'react';
import userService from '../service/UserService';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      // Kiểm tra xem data có chứa thuộc tính users và là mảng không
      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("Dữ liệu không chứa mảng users:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
    }
  };

  const deleteUser = async (id) => {
    await userService.deleteUser(id);
    fetchUsers(); // Refresh list
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Người dùng</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
