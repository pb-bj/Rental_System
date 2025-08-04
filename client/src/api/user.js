import { instance } from './instance';

export const userCountRequest = async (token) => {
    try {
        const response = await instance.get('/api/user-count', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const userBookingCountRequest = async (token) => {
    try {
        const response = await instance.get('/car-booking/user-booking-count', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}