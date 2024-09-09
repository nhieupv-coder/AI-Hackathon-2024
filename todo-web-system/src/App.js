import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import TaskList from './TaskList';
import PrivateRoute from './PrivateRoute';
import MenuBar from './MenuBar';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <div>
        <MenuBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<TaskList token={token} />} />
          <Route path="/" element={<PrivateRoute token={token}><TaskList /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
