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
    return (
        <div className="cheat-sheet-list">
            {cheatSheets.length === 0 ? (
                <p>No cheat sheets available.</p>
            ) : (
                cheatSheets.map((sheet, index) => (
                    <div key={index} className="cheat-sheet-item">
                        <h3 className="font-semibold">{sheet.shortCuts}</h3>
                        <p>{sheet.details}</p>
                        <button
                            onClick={() => onDelete(index)}  // 삭제 버튼 클릭 시 onDelete 호출
                            className="bg-red-500 text-white p-2 rounded mt-2"
                        >
                            삭제
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};