import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getAllBookingsRequest, getBookingsCount, totalRevenueAmount  } from "../api/booking";

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingCounts, setBookingCounts] = useState(0);
    const [activeBookingCounts, setActiveBookingCounts] = useState(0);
    const [cancelledBookingCounts, setCancelledBookingCounts] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    // const [totalRefunded, setTotalRefunded] = useState(0);
    const { authToken } = useAuth();

    useEffect(() => {
        const getBookings = async () => {
            try {
                // for all booking
                const result = await getAllBookingsRequest(authToken.token);
                setBookings(result.bookings);

                const revenueAmount = await totalRevenueAmount(authToken.token);
                setTotalRevenue(revenueAmount.totalRevenue);

                //  const refundedAmount = await totalRefundedAmount(authToken.token);
                // setTotalRefunded(refundedAmount.totalRefunded);

                // for booking count
                const totalBookings = await getBookingsCount(authToken.token);
                    setBookingCounts(totalBookings.bookingCount);
                    setActiveBookingCounts(totalBookings.totalActiveBookingCount)
                    setCancelledBookingCounts(totalBookings.totalCancelledBookingCount);
                
            } catch (err) {
                console.log(err);  
            }
        }

        getBookings()
    }, [])
    return { bookings, bookingCounts, activeBookingCounts, cancelledBookingCounts, totalRevenue }
}