import { apiFetch } from './apiUtils';

export const signin = async (email: string, password: string): Promise<any> => {
    try {
        const result = await apiFetch('/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem('authToken', result.session.access_token);

        return result; 
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'login fail');
    }
};


export const signUp = async (email: string, password: string) => {
    try {
        const result = await apiFetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        return result; 
    } catch (error) {
        console.log(error instanceof Error ? error.message : 'signup fail');
        
        throw new Error(error instanceof Error ? error.message : 'signup fail');
    }
};

