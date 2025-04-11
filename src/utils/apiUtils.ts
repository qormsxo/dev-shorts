const BASE_URL = 'http://localhost:5000/api';  // API의 공통 URL

// fetch 요청을 공통으로 처리하는 함수
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });
    
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error.message+ 'API 요청 실패');
        }

        return result;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : '알 수 없는 에러');
    }
};
