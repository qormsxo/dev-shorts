import React from 'react';

// CheatSheet 타입 정의
export interface ShortCuts {
    shortCuts: string;
    details: string;
}

interface ShortCutListListProps {
    cheatSheets: ShortCuts[];
    onDelete: (index: number) => void;  // 삭제 기능을 위한 onDelete 함수 추가
}


export const ShortCutList: React.FC<ShortCutListListProps> = ({ cheatSheets, onDelete }) => {

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content).then(() => {
            alert('내용이 복사되었습니다!');
        }).catch(err => {
            console.error('복사 실패:', err);
        });
    };

    return (
        <div className="cheat-sheet-list">
            {cheatSheets.length === 0 ? (
                <p>No cheat sheets available.</p>
            ) : (
                cheatSheets.map((sheet, index) => (
                    <div 
                        key={index} 
                        className="cheat-sheet-item"
                        onClick={() => handleCopy(sheet.shortCuts)}  // 클릭 시 복사
                    >
                        <h3>{sheet.shortCuts}</h3>
                        <p>{sheet.details}</p>
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