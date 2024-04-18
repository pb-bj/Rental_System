import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { userData } = useAuth();
    return (
        <>
            {userData.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace />}
        </>
    )

}

export default PrivateRoute