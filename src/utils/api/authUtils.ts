import { getErrorMessage } from '../errorUtils';
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
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
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
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};

