import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <button className="home-button" onClick={handleLoginClick}>Fazer Login</button>
      <button className="home-button">Entrar sem Cadastro</button>
    </div>
  );
}

export default Home;