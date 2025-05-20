import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/paymentConfirmationPage.css";

const API_URL="http://localhost:3000/"

const PaymentConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as { method: string, cart: { [key: number]: number }, userId?: number } | null;
  const method = state?.method || "";
  const cart = state?.cart || {};
  const userId = state?.userId;

  if (!method) {
    navigate("/payment", { state: { cart, userId } });
    return null;
  }
  
  if (!userId) {
    alert("Usuário não identificado. Por favor, faça login novamente.");
    navigate("/");
    return null;
  }

   const handleFinalize = () => {
    if (!cart || Object.keys(cart).length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    // 🔧 Estrutura compatível com o backend
    const pedido = {
      user_id: userId,
      items: Object.entries(cart).map(([productId, quantity]) => ({
        product_id: Number(productId),
        quantity: Number(quantity),
      })),
    };

    fetch(`${API_URL}order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao enviar pedido");
        return response.json();
      })
      .then(data => {
        alert("Pedido enviado com sucesso!");
        navigate("/");
      })
      .catch(error => {
        console.error("Erro ao enviar pedido:", error);
        alert("Erro ao enviar pedido. Tente novamente.");
      });
  };


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

      <button className="back-button" onClick={() => navigate("/payment", { state: { cart, userId } })}>
        Voltar
      </button>
      <button className="finish-button" onClick={handleFinalize}>
        Finalizar
      </button>
    </div>
  );
};

export default PaymentConfirmationPage;
