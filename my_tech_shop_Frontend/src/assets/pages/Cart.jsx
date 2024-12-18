import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing");
      setLoading(false);
      return;
    }

    // Fetch cart items
    axios
      .get(`http://localhost:3000/api/cart/${userId}`)
      .then((response) => {
        setCart(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, [userId]);

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) return;

    axios
      .put(`http://localhost:3000/api/cart/update`, { userId, itemId, quantity })
      .then((response) => {
        setCart(response.data.cart.items);
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  const removeFromCart = (itemId) => {
    axios
      .delete("http://localhost:3000/api/cart/remove", {
        data: { userId, itemId },
      })
      .then((response) => setCart(response.data.cart.items))
      .catch((error) => console.error("Error removing product:", error));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { cart, total: calculateTotal(),userId  } });
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart.length) return <p>Your cart is empty.</p>;

  return (
    <div className="container py-5">
      <h3>Your Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()} ₫</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value))
                  }
                  className="form-control"
                  style={{ width: "60px" }}
                />
              </td>
              <td>{(item.price * item.quantity).toLocaleString()} ₫</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Total: {calculateTotal().toLocaleString()} ₫</h4>
        <button
          className="btn btn-primary"
          onClick={proceedToCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
