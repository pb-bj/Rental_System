import { useContext, createContext, useEffect, useState } from "react"
import { getUserBookingsRequest } from "../api/booking";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
    const [ userBookings, setUserBookings ] = useState([]);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authToken) return;
            try {
                const data = await getUserBookingsRequest(authToken.token);
                setUserBookings(data.bookings);
                console.log('single user bookings ', data.bookings);
            } catch (err) {
                console.log(err);
            }
        }
            fetchUserData();
        }, [authToken])
    
  return (
      <BookingContext.Provider value={{ userBookings  }}>{children}</BookingContext.Provider>
  )
}

export const useBooking = () => {
    return useContext(BookingContext);
}

export default BookingProvider;