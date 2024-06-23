import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
// import { getAllBookingsRequest, getUserBookingsRequest } from "../api/booking";
import { getAllBookingsRequest, getBookingsCount } from "../api/booking";

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingCounts, setBookingCounts] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(false);
    const { authToken } = useAuth();
    useEffect(() => {
        const getBookings = async () => {
            try {
                // for all booking
                const result = await getAllBookingsRequest(authToken.token);
                setBookings(result.bookings);

                //for single user 
                // const data = await getUserBookingsRequest(authToken.token);
                // setUserBookings(data.bookings)
                // console.log('User booking:', data.bookings)

                const totalBookings = await getBookingsCount(authToken.token);
                setBookingCounts(totalBookings.bookingCount);    
                
            } catch (err) {
                console.log(err);  
            }
        }

        getBookings()
    }, [])
    // return { bookings, userBookings }
    return { bookings, bookingCounts }
}