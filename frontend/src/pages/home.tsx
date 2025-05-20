import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const API_URL="http://localhost:3000/"

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleWithoutLoginClick = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}anonymous-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (response.ok) {
        const userId  = data.id;
        navigate('/mainPage', { state: { userId: userId } });
      } else {
        console.error("Error creating anonymous user:", data.error);
        alert("Error starting without login. Please try again.");
      }
    } catch (error) {
      console.error("Network error when creating anonymous user:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <button className="home-button" onClick={handleLoginClick}>Fazer Login</button>
      <button className="home-button" onClick={handleWithoutLoginClick}>Entrar sem Cadastro</button>
    </div>
  );
};

export default Home;