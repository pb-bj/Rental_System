import { useContext, createContext, useEffect, useState } from "react"
import { getUserBookingsRequest } from "../api/booking";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [ userBookings, setUserBookings ] = useState([]);
    const { authToken } = useAuth();
    const [ isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authToken) return;
            setIsLoading(true);
            setError(null);

            try {
                const data = await getUserBookingsRequest(authToken.token);
                setUserBookings(data.bookings);
                console.log('single user bookings ', data.bookings);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch user bookings');
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserData();
    }, [authToken])
  return (
      <BookingContext.Provider value={{ userBookings, isLoading, error }}>{children}</BookingContext.Provider>
  )
}

export const useBooking = () => {
    return useContext(BookingContext);
}

export default BookingProvider;