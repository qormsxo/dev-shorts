import { Shortcut } from '../../components/ShortcutList';
import { getErrorMessage } from '../errorUtils';
import { ApiClientWithAuth } from './apiUtils';
const apiClientWithAuth = new ApiClientWithAuth();



export const getCategory = async () => {
    try {
        const result = await apiClientWithAuth.fetchRequest('/category', {
            method: 'GET'
        });

        return result;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};


export const getShortcut = async () => {
    try {
        const result = await apiClientWithAuth.fetchRequest('/shortcut', {
            method: 'GET'
        });

        return result;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};


export const add = async (entry: Shortcut) => {
    const { categoryId, shortcut, detail } = entry;
    console.log(entry);
    
    try {
        const result = await apiClientWithAuth.fetchRequest('/shortcut', {
            method: 'POST',
            body: JSON.stringify({ category_id: categoryId,  shortcut, detail }),
        });

        return result;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};


export const remove = async (shortcutId: number) => {
    try {
        const result = await apiClientWithAuth.fetchRequest('/auth/signup', {
            method: 'DELETE',
            body: JSON.stringify({ id: shortcutId }),
        });

        return result;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
    }
};

