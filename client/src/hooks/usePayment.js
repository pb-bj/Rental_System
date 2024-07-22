import { getUserPaymentDetail } from "../api/payment";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const usePayment = () => {
    const [userPayments, setUserPayments] = useState([]);
    const { authData, authToken } = useAuth();

    useEffect(() => {
        const fetchUserPayment = async () => {
            try {
                const result = await getUserPaymentDetail(authData.id, authToken.token);
                setUserPayments(result.payment);
            } catch (err) {
                console.log("Error found while fetching payment of user", err);
            }
        }

        fetchUserPayment();
    }, [authData, authToken.token])
    return { userPayments }    
}

export default usePayment