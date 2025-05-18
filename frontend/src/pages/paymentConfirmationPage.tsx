import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/paymentConfirmationPage.css";

const PaymentConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extrai o método de pagamento de forma segura
  const state = location.state as { method: string } | null;
  const method = state?.method || "";

  // Redireciona se nenhum método for selecionado
  if (!method) {
    navigate("/payment");
    return null;
  }

  let message = "";
  if (method === "Pix") {
    message = "Obrigado! Use o QR code abaixo para pagar via Pix.";
  } else if (method === "Cartão") {
    message = "Obrigado! Insira ou aproxime o cartão na máquina.";
  } else if (method === "Dinheiro") {
    message = "Obrigado! Efetue o pagamento no caixa.";
  }

  return (
  <div className="confirmation-container">
    <h2>Pagamento via {method}</h2>
    <p>{message}</p>

    {method === "Pix" && (
      <img
        src="/qrcode_pix.jpg"
        alt="QR Code Pix"
        className="qrcode"
      />
    )}

    <button className="back-button" onClick={() => navigate("/payment")}>
      Voltar
    </button>
    <button className="finish-button" onClick={() => navigate("/mainPage")}>
      Finalizar
    </button>
  </div>
);

};

export default PaymentConfirmationPage;
