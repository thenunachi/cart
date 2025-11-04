import React, { useState } from 'react';
import { signup, login, getProtectedData } from './AuthService';
import './AuthTest.css'; // Make sure this file exists

function AuthTest({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!username || !password) {
      setError("Both fields are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    try {
      await signup(username, password);
      setMessage('Signup successful!');
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      const data = await login(username, password);
      console.log(data,"data from login")
      setMessage(`Login successful! Welcome ${data.username}`);
      onLogin(data);
    } catch (err) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Enter your details</h2>

      <input
        className="auth-input"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p className="auth-error">{error}</p>}
      {message && <p className="auth-success">{message}</p>}

      <div className="auth-button-row">
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default AuthTest;