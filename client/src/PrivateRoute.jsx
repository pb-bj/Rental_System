import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { authData } = useAuth();
    return (
        <>
            {authData?.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace />}
        </>
    )

}

export default PrivateRoute