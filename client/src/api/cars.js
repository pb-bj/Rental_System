import { instance } from "./instance";

export const carPostRequest = async (formData, token) => {
    try {
        const response = await instance.post('/api/create-car', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;

    } catch (error) {
        console.error(error.message)
    }
}

export const getAllCars = async () => {
    try {
        const response = await instance.get('/api/get-all-cars');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getSingleCar = async (carId) => {
    try {
        const response = await instance.get(`/api/get-car/${carId}`);
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export const deleteCarItem = async (carId, token) => {
    console.log('delete ', carId, token)
    try {
        const response = await instance.delete(`/api/delete-car/${carId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.message);
    } catch (error) {
        console.log(error);
    }
}

export const updateCarItem = async (carId, carDetail, token) => {
    try {
        const response = await instance.put(`/api/update-car/${carId}`, carDetail, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        return response.message
    } catch (error) {
        console.log(error);
    }
}