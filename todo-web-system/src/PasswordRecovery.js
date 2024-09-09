import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/password-recovery', { email });
      if (response.status === 200) {
        setSuccess('Password recovery email sent!');
        setEmail('');
        setError('');
      }
    } catch (err) {
      setError('Password recovery failed. Please check your email and try again.');
    }
  };

  return (
    <div className="password-recovery-container">
      <h2>Password Recovery</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Recover Password</button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
