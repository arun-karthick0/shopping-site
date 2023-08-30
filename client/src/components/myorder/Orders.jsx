import axios from "axios";
import { useEffect, useState } from "react";
import "./orders.css";
const Orders = ({ orders, users }) => {
  const [data, setData] = useState("");
  console.log(data);
  console.log(users.email);
  useEffect(() => {
    axios
      .get("https://shopping-site-ejw5.onrender.com/getdata", users.email)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order_content">
      <h3>My Orders</h3>
      <div className="order_item">
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>delivery status</th>
                <th>payment status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.productQty}</td>
                  <td>{orders ? "delivery soon" : "confirm-payment"}</td>
                  <td>{orders ? "payment done " : "payment-not done"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No items</h1>
        )}
      </div>
    </div>
  );
};

export default Orders;
