import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleWithoutLoginClick = (): void => {
    navigate('/mainPage');
  };

  return (
    <div className="home-container">
      <button className="home-button" onClick={handleLoginClick}>Fazer Login</button>
      <button className="home-button" onClick={handleWithoutLoginClick}>Entrar sem Cadastro</button>
    </div>
  );
};

export default Home;