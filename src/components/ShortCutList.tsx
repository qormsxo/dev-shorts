import React from 'react';

export interface Shortcut {
    shortcut: string;
    detail: string;
    categoryId: number;
}

interface ShortcutListListProps {
    shortcuts: Shortcut[];
    onDelete: (index: number) => void;  // 삭제 기능을 위한 onDelete 함수 추가
}


export const ShortcutList: React.FC<ShortcutListListProps> = ({ shortcuts, onDelete }) => {

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content).then(() => {
            alert('내용이 복사되었습니다!');
        }).catch(err => {
            console.error('복사 실패:', err);
        });
    };

    return (
        <div className="cheat-sheet-list">
            {shortcuts.length === 0 ? (
                <p>No cheat sheets available.</p>
            ) : (
                shortcuts.map((shortcut, index) => (
                    <div 
                        key={index} 
                        className="cheat-sheet-item"
                        onClick={() => handleCopy(shortcut.shortcut)}  // 클릭 시 복사
                    >
                        <h3>{shortcut.shortcut}</h3>
                        <p>{shortcut.detail}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();  // 버튼 클릭 시 div의 onClick 이벤트가 호출되지 않도록 함
                                onDelete(index);
                            }}
                            className="delete"
                        >
                            삭제
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};