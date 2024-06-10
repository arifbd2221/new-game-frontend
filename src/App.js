import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './leaderboard/leaderboard';
import RegisterForm from './registration/register';
import { PlayGame } from './playGame';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="*" element={<RegisterForm />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
