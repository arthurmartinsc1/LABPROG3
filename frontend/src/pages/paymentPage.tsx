import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paymentPage.css";

const PaymentPage: React.FC = () => {
const navigate = useNavigate();

return (
    <div className="payment-container">
      <h2>Escolha o meio de pagamento</h2>
      <div className="payment-options">
        <button className="payment-button pix">Pix</button>
        <button className="payment-button credit">Crédito</button>
        <button className="payment-button debit">Débito</button>
      </div>
      <button className="back-button" onClick={() => navigate("/mainPage")}>
        Voltar
      </button>
    </div>
  );
};

export default PaymentPage;