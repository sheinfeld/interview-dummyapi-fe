import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(API_URL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUsers();
    }, []);

    return (
        <div>
            {isLoading ? (
                 <p>Loading...</p>
            ) : (
                <ul>
                    { users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    )) }
                </ul>
            )}
        </div>
    );
};

export default UserList;