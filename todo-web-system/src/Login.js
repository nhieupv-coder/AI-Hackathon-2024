import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        setError('');
        navigate('/home'); // Redirect to homepage
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-teal-500 text-transparent bg-clip-text">Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username:</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 rounded-lg border shadow-sm bg-gradient-to-r from-blue-100 to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg border shadow-sm bg-gradient-to-r from-blue-100 to-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
