import { useContext, createContext, useEffect, useState } from "react"
import { getUserBookingsRequest, bookingCancellation } from "../api/booking";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [ userBookings, setUserBookings ] = useState([]);
    const { authToken } = useAuth();

    const fetchUserData = async () => {
        if (!authToken) return;
        try {
            const data = await getUserBookingsRequest(authToken.token);
            setUserBookings(data.bookings);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
            fetchUserData();
    }, [authToken])

    const cancelBooking = async (bookingId, cancelReason) => {
        try {
            setUserBookings((prevBookings) => {
                prevBookings.map((booking) => {
                return booking.id === bookingId ? {...booking,  isCancelled: true } : booking
            })})
        } catch (err) {
            fetchUserData(); // in case of cancellation failed
        }
        await bookingCancellation(bookingId, cancelReason, authToken.token);
        await fetchUserData() // refetching the data after cancellation
    }
  return (
      <BookingContext.Provider value={{ userBookings, cancelBooking  }}>{children}</BookingContext.Provider>
  )
}

export const useBooking = () => {
    return useContext(BookingContext);
}

export default BookingProvider;