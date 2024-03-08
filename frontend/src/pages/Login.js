import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {

        
        const user = { username, password };

        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          const tkn = data['access_token']
            localStorage.setItem('token', tkn);

          console.log('User created successfully:', tkn);
        } catch (error) {
          console.error('Error creating course:', error.message);
        }

        navigate('/Cursos');
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;