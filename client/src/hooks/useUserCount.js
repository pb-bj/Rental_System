import { useEffect, useState } from 'react';
import { userCountRequest } from '../api/user';
import { useAuth } from '../contexts/AuthContext';

export const useUserCount = () => {
    const [userCounts, setUserCounts] = useState(0);
    const { authToken } = useAuth();

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const users = await userCountRequest(authToken.token);
                setUserCounts(users.totalCustomerCount);
            } catch (error) {
                console.log(error);
            }
        }

        getUserCount();
    }, []);

    return { userCounts }
}