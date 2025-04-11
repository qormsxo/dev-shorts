// src/pages/popup.tsx
import React, { useEffect, useState } from 'react';
import { ShortCutList, ShortCuts } from '../components/ShortCutList';
import { AddEntryForm } from '../components/AddEntryForm';
import { LoginForm } from '../components/LoginForm';  // 로그인 폼 컴포넌트
import { getCheatSheets, saveCheatSheet, deleteCheatSheet } from '../utils/storage';
import { signin, signUp } from '../utils/api/authUtils';
import { SignUpForm } from '../components/SignUpForm';
import { handleError } from '../utils/errorUtils';

export const Popup = () => {
    const [cheatSheets, setCheatSheets] = useState(getCheatSheets());
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false); 
        }
    }, []);  


    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await signin(email, password); 
            setIsLoggedIn(true); 
        } catch (error) {
            alert(handleError(error, 'login fail'));
        }
    };

    const handleSignUp = async (email: string, password: string) => {
        try {
            const response = await signUp(email, password);

            if (response.ok) {
                alert('signUp succes!');
                setIsSignUp(true)
            }
        } catch (error) {
            alert(handleError(error, 'signup fail'));
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    const handleAddCheatSheet = (newEntry: ShortCuts) => {
        saveCheatSheet(newEntry);
        setCheatSheets(getCheatSheets());
    };

    const handleDeleteCheatSheet = (index: number) => {
        deleteCheatSheet(index);
        setCheatSheets(getCheatSheets());
    };

    return (
        <div className="popup-container">
            {isLoggedIn && (<p
                onClick={handleLogout}
                className="logout"
            >
                Logout
            </p>
            )}

            <h1 className="text-xl font-bold mb-4">DevShorts</h1>
            {!isLoggedIn && (
                <div className="tabs">
                    <div
                        onClick={() => setIsSignUp(false)}
                        className={`tab ${!isSignUp ? 'active' : ''}`}
                    >
                        SIGN IN
                    </div>
                    <div
                        onClick={() => setIsSignUp(true)}
                        className={`tab ${isSignUp ? 'active' : ''}`}
                    >
                        SIGN UP
                    </div>
                </div>
            )}
            {!isLoggedIn ? (
                isSignUp ? (
                    <SignUpForm onSignUp={handleSignUp} />
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )
            ) : (
                <>
                    <AddEntryForm onAdd={handleAddCheatSheet} />
                    <ShortCutList cheatSheets={cheatSheets} onDelete={handleDeleteCheatSheet} />

                </>
            )}
        </div>
    );
};
