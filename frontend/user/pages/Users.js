import React, { useEffect, useState } from 'react';

import UsersList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// Conecta os usuarios no backend
const Users = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                setLoadedUsers(responseData.users);

            } catch (err) {
               
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return 
    <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
}