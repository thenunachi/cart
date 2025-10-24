import { useState, useEffect } from "react";
import { getOrders } from "./orderServices";
import "./PreviousOrders.css";

const PreviousOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.token) {
      getOrders(user.token)
        .then(setOrders)
        .catch(console.error);
    }
  }, [user?.token]);

  return (
    <div className="previousOrders">
      <h3>Previous Orders</h3>

      {orders.length === 0 ? (
        <p className="no-orders">No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p className="order-date">📅 Date: {order.created_at}</p>
            <ul>
              {Object.entries(order.items).map(([name, item]) => (
                <li key={name}>
                  {item.count}x {name} (${item.price})
                </li>
              ))}
            </ul>
            <p className="order-total">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousOrders;