import { getErrorMessage } from '../errorUtils';
import { ApiClient } from './apiUtils';

const apiClient = new ApiClient();

export const signin = async (email: string, password: string): Promise<any> => {
    try {
        const result = await apiClient.fetchRequest('/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem('access_token', result.session.access_token);

        return result; 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};


export const signUp = async (email: string, password: string) => {
    try {
        const result = await apiClient.fetchRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        return result; 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};

