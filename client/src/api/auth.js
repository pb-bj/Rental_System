import { instance } from "./instance";

export const registerPostRequest = async (userData) => {
    try {
        const response = await instance.post('/api/auth/register', userData);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const loginPostRequest = async (userData) => {
    try {
        const response = await instance.post('/api/auth/login', userData, { withCredentials: true });
        return response;

    } catch (error) {
        return error.response
    }
};