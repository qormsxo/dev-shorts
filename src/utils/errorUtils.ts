export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return '알 수 없는 에러';
};

export const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof Error) {
        return error.message;
    }
    return defaultMessage;
};