import { instance } from "./instance";

export const paymentPostRequest = async (paymentData, token) => {
    try {
        const response = await instance.post('/api/payment-process', paymentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Payment details : ", response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getUserPaymentDetail = async (userId, token) => {
    try {
        const response = await instance.get(`/api/user-payment-detail/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Payment details : ", response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}