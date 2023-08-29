import "./orders.css";
const Orders = ({ orders, cartItem }) => {
  return (
    <div className="order_content">
      <h3>My Orders</h3>
      <div className="order_item">
        {cartItem.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>delivery status</th>
                <th>payment status</th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.imgUrl}
                      alt=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
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
