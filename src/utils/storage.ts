import { ShortCuts } from "../components/shortCutList";

// src/utils/storage.ts
const CHEATSHEET_STORAGE_KEY = 'dev_cheat_sheets';

// 치트시트 목록 가져오기
export const getCheatSheets = () => {
    const data = localStorage.getItem(CHEATSHEET_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// 새로운 치트시트 저장
export const saveCheatSheet = (newEntry: ShortCuts) => {
    const cheatSheets = getCheatSheets();
    cheatSheets.push(newEntry);
    localStorage.setItem(CHEATSHEET_STORAGE_KEY, JSON.stringify(cheatSheets));
};

// 치트시트 삭제
export const deleteCheatSheet = (index: number) => {
    const cheatSheets = getCheatSheets();
    cheatSheets.splice(index, 1);  // 해당 인덱스의 항목을 삭제
    localStorage.setItem(CHEATSHEET_STORAGE_KEY, JSON.stringify(cheatSheets));
};
