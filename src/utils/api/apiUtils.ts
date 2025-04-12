// const BASE_URL = "https://dev-short-backend-085d0acdebfb.herokuapp.com/api"
const BASE_URL = "http://localhost:5000/api"

// 기본 API 요청 클래스
class ApiClient {
    protected baseUrl: string = BASE_URL;

    public async fetchRequest(endpoint: string, options: RequestInit = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.error);
                throw new Error(result?.error || 'API 요청 실패');
            }

            return result;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : '알 수 없는 에러');
        }
    }
}


// 인증이 필요한 API 요청 클래스 (ApiClient 상속)
class ApiClientWithAuth extends ApiClient {

    // fetchRequest를 오버라이드하여 Authorization 헤더 추가
    public async fetchRequest(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...(options.headers || {}),
            },
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            throw new Error(result?.error || 'API 요청 실패');
        }

        return result;
    }
}
export { ApiClient, ApiClientWithAuth }; // 둘 다 named export로 내보냄