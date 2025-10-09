import React, { useState } from 'react';
import { signup, login, getProtectedData } from './AuthService';

function AuthTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    await signup(username, password);
    setMessage('Signup successful!');
  };

  const handleLogin = async () => {
    await login(username, password);
    setMessage('Login successful!');
  };

  const handleProtected = async () => {
    const data = await getProtectedData();
    setMessage(`Protected data: ${JSON.stringify(data)}`);
  };

  return (
    <div>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProtected}>Get Protected Data</button>
      <p>{message}</p>
    </div>
  );
}

export default AuthTest;