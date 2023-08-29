import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="payment-success-container">
      <i className="fas fa-check-circle check-icon"></i>
      <h4 className="success-message">Payment Successful</h4>
    </div>
  );
};

export default PaymentSuccess;
