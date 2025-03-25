import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";



const API_URL="http://localhost:3000/"


type NotificationPlacement = NotificationArgsProps["placement"];

const Login: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "error",
    message: string,
    description: string,
    placement: NotificationPlacement = "topRight"
  ) => {
    api[type]({
      message,
      description,
      placement,
    });
  };


  const handleBackClick = () => {
    navigate('/');
  };

  const handleLoginClick = async () => {
    if (!cpf.trim()) {
      openNotification("error", "Erro no Login", "Por favor, insira um CPF.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}usuarios/cpf?cpf=${cpf}`);
      const data = await response.json();

      if (data.length === 0) {
        openNotification("error", "Erro no Login", "CPF não cadastrado");
      } else {
        openNotification("success", "Login Bem Sucedido!", "Você será redirecionado...");
        setTimeout(() => navigate("/mainPage"), 1500); 
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      openNotification("error", "Erro no Servidor", "Tente novamente mais tarde");
    }
  };

  return (
    <div className="login-page">
      {contextHolder}
      <div className="login-content">
        <div className="login-header">
          <h2>Faça seu login</h2>
          <button className="back-button" onClick={handleBackClick}>Voltar</button>
        </div>
        <div className="login-container">
          <input type="text" placeholder="CPF" className="login-input" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
          <button className="login-button" onClick={handleLoginClick}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
