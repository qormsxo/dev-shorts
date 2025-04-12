import React, { useEffect, useState } from 'react';
import { Shortcut } from './ShortcutList';
import { getCategory } from '../utils/api/shortcutUtils';

// 함수 타입 정의
interface AddEntryFormProps {
    onAdd: (newEntry: Shortcut) => void;
}

export const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAdd }) => {
    const [shortcut, setShortcut] = useState('');
    const [detail, setDetail] = useState('');

    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]); // 카테고리 상태 추가
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined); // 선택된 카테고리

    // 컴포넌트가 마운트되면 카테고리 데이터를 불러옴
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategory();
                setCategories(data);
            } catch (error) {
                console.error('카테고리 로드 실패:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (shortcut && detail && selectedCategory !== undefined) {
            // 카테고리와 함께 새로운 항목 추가
            onAdd({ shortcut, detail, categoryId: selectedCategory });
            setShortcut('');
            setDetail('');
            setSelectedCategory(undefined);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-entry-form">
            <input
                type="text"
                placeholder="Shortcuts"
                value={shortcut}
                onChange={(e) => setShortcut(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <textarea
                placeholder="Detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
             <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                className="border p-2 mb-2 w-full"
            >
                <option value={undefined}>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
        </form>
    );
};
