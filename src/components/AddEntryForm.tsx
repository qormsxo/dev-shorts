import React, { useState } from 'react';
import { ShortCuts } from './ShortCutList';

// 함수 타입 정의
interface AddEntryFormProps {
    onAdd: (newEntry: ShortCuts) => void;
}

export const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAdd }) => {
    const [shortCuts, setShortCuts] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (shortCuts && details) {
            onAdd({ shortCuts, details });
            setShortCuts('');
            setDetails('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-entry-form">
            <input
                type="text"
                placeholder="Shortcuts"
                value={shortCuts}
                onChange={(e) => setShortCuts(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <textarea
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
        </form>
    );
};
