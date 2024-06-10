import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Leaderboard from './leaderboard/leaderboard';
import RegisterForm from './registration/register';
import { PlayGame } from './playGame';


function App() {
  const [isUserRegistered, setIsUserRegistered] = useState(null);

  useEffect(() => {
    const userRegistered = localStorage.getItem('userid');
    setIsUserRegistered(userRegistered);
  }, []);

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/play" element={<PlayGame />} />
        <Route
            path="/"
            element={
              isUserRegistered ? (
                <Navigate to="/play" />
              ) : (
                <RegisterForm />
              )
            }
          />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
