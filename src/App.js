import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Level1 from './components/level1';
import Level2 from './components/level2';
import Level3 from './components/level3';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level1" element={<Level1 />} />
      <Route path="/level2" element={<Level2 />} />
      <Route path="/level3" element={<Level3 />} />
    </Routes>
  );
}

export default App;