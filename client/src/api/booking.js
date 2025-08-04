import { instance } from "./instance";

// for booking process
export const bookingRequest = async (bookingData, token) => {
    try {
        const response = await instance.post('/api/car-booking', bookingData, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// only for admin
export const getAllBookingsRequest = async (token) => {
    try {
        const response = await instance.get(`/api/car-booking/admin/all`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// only for user
export const getUserBookingsRequest = async (token) => {
    try {
        const response = await instance.get(`/api/car-booking/user`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//for all bookings
export const getBookingsCount = async (token) => {
    try {
        const response = await instance.get(`/api/car-booking/all-booking-count`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// for booking cancellation
export const bookingCancellation = async (id, cancellationReason, token) => {
    try {
        const response = await instance.post(`/api/car-booking/cancellation/${id}`, cancellationReason, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

//for cancellation-report 
export const cancellationReportRequest = async (token) => {
    try {
        const response = await instance.get(`/api/car-booking/get-all-cancelled-bookings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

//for user 
export const cancellationReportUser = async (token) => {
    try {
        const response = await instance.get(`/api/car-booking/get-all-cancelled-bookings-by-admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};


// for total revenue amount 
export const totalRevenueAndRefundedAmount = async (token) => {
    try {
         const response = await instance.get(`/api/car-booking/revenue`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const checkBookingAvailability = async (data, token) => {
    try { 
        const response = await instance.post('/api/car-booking/check-availability', {data}, {
            header: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const makeApprovalRequest = async (token) => {
    try {
        const response = await instance.patch('/api/car-booking/check-availability', {
            header: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

