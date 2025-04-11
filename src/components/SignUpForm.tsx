// src/components/SignUpForm.tsx
import React, { useState } from 'react';
import { loginUser } from '../utils/authUtils';

interface SignUpFormProps {
    onSignUp: (email: string, password: string) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력하세요.');
            return;
        }

        try {
            await onSignUp(email, password);
        } catch (error) {
            setError(error instanceof Error ? error.message : '알 수 없는 오류');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}  className="login-form">
                <div>
                    <input
                        type="text"
                        id="email"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};