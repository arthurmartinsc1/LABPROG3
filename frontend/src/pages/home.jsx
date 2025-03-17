import React from 'react';
import '../styles/home.css';

function Home() {
  return (
    <div className="home-container">
      <button className="home-button">Fazer Login</button>
      <button className="home-button">Entrar sem Cadastro</button>
    </div>
  );
}

export default Home;