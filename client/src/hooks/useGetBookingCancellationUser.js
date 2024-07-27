import { useEffect, useState } from "react";
import { cancellationReportUser } from "../api/booking";
import { useAuth } from "../contexts/AuthContext";

export const useGetBookingCancellationUser = () => {
    const [cancellations, setCancellations] = useState([]);
    const { authToken } = useAuth();

    const cancellationCount = cancellations.length;
    useEffect(() => {
        const fetchCancellationData = async () => {
            try {
                const data = await cancellationReportUser(authToken.token);
                setCancellations(data.adminCancelledBookings)
            } catch (err) {
                console.log(err);
            }
        }
        fetchCancellationData();
    }, [])
    return { cancellations, cancellationCount }
}