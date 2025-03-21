import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Função de manipulação do clique para o botão "Voltar"
  const handleBackClick = () => {
    navigate('/');
  };

  // Função de manipulação do clique para o botão "Entrar"
  const handleLoginClick = () => {
    console.log('Entrar clicado');
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-header">
          <h2>Faça seu login</h2>
          <button className="back-button" onClick={handleBackClick}>Voltar</button>
        </div>
        <div className="login-container">
          <input type="text" placeholder="CPF" className="login-input" />
          <button className="login-button" onClick={handleLoginClick}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
