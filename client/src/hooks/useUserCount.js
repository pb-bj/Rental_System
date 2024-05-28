import { useEffect, useState } from 'react';
import { userCountRequest, userBookingCountRequest } from '../api/user';
import { useAuth } from '../contexts/AuthContext';

export const useUserCount = () => {
    const [userCounts, setUserCounts] = useState(0);
    const [userBookingCounts, setUserBookingCounts] = useState(0);
    const { authToken } = useAuth();

    useEffect(() => {
        const getUserCount = async () => {
            try {
                const users = await userCountRequest(authToken.token);
                setUserCounts(users.totalCustomerCount);

                const bookings = await userBookingCountRequest(authToken.token);
                setUserBookingCounts(bookings.bookingCounts);
            } catch (error) {
                console.log(error);
            }
        }

        getUserCount();
    }, []);

    return { userCounts, userBookingCounts }
}