import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { auth } = useAuth();
    return (
        <>
            {auth.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace />}
        </>
    )

}

export default PrivateRoute