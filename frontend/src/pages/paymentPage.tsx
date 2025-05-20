import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/paymentPage.css";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart;
  const userId = location.state?.userId;

  const handlePaymentChoice = (method: string) => {
  navigate("/paymentConfirmation", { state: { method, cart, userId } });
};

  return (
    <div className="payment-container">
      <h2>Escolha o meio de pagamento</h2>
      <div className="payment-options">
        <button
          className="payment-button pix"
          onClick={() => handlePaymentChoice("Pix")}
        >
          Pix
        </button>
        <button
          className="payment-button credit"
          onClick={() => handlePaymentChoice("Cartão")}
        >
          Cartão
        </button>
        <button
          className="payment-button debit"
          onClick={() => handlePaymentChoice("Dinheiro")}
        >
          Dinheiro
        </button>
      </div>
      <button className="back-button" onClick={() => navigate('/mainPage', { state: { userId: userId } })}>
        Voltar
      </button>
    </div>
  );
};

export default PaymentPage;
