import React from 'react';
import '../styles/login.css';

function Login() {
  return (
    <div className="login-container">
      <button className="login-button">Fazer Login</button>
      <button className="login-button">Entrar sem Cadastro</button>
    </div>
  );
}

export default Login;