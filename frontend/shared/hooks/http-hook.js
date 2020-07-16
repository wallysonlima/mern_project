import { useState } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallBack(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
    
            const responseData = await response.json();
                
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            return responseData;
        } catch(err) {
            setError(err.message);
        }
        
        setIsLoading(false);
    }, []);

    const clearError = => {
        setError(null);
    };

    return { isLoading, error, sendRequest};
};