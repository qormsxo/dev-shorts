import React, { useState } from 'react';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="text"
                placeholder="Username"
                id='email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                id='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
    );
};