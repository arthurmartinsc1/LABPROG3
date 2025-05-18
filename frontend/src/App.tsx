import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Login from './pages/login';
import MainPage from './pages/mainPage';
import PaymentPage from './pages/paymentPage';
import PaymentConfirmationPage from './pages/paymentConfirmationPage';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paymentConfirmation" element={<PaymentConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;