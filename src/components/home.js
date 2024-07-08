// src/components/Home.js
import React from 'react';
import './home.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/level1');
  };

  return (
    <div className='container'>
      <h1>Welcome To My Math-Game</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default Home;
