// src/pages/popup.tsx
import React, { useState } from 'react';
import { ShortCutList, ShortCuts } from '../components/shortCutList';
import { AddEntryForm } from '../components/AddEntryForm';
import { getCheatSheets, saveCheatSheet, deleteCheatSheet } from '../utils/storage';

export const Popup = () => {
    const [cheatSheets, setCheatSheets] = useState(getCheatSheets());

    const handleAddCheatSheet = (newEntry: ShortCuts) => {
        saveCheatSheet(newEntry);
        setCheatSheets(getCheatSheets());  // 새로운 항목 추가 후 목록 갱신
    };

    const handleDeleteCheatSheet = (index: number) => {
        deleteCheatSheet(index);
        setCheatSheets(getCheatSheets());  // 삭제 후 목록 갱신
    };

    return (
        <div className="popup-container">
            <h1 className="text-xl font-bold mb-4">DevShorts</h1>
            <AddEntryForm onAdd={handleAddCheatSheet} />
            <ShortCutList cheatSheets={cheatSheets} onDelete={handleDeleteCheatSheet} />
        </div>
    );
};
