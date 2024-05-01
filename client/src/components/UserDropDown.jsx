import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserDropDown = ({ onClose }) => {
    const { userLoggedOut, authData } = useAuth();
    return (
        <>
            <div
                className="mt-11 border p-3 rounded list-unstyled bg-body-tertiary"
                style={{
                    zIndex: '999',
                    cursor: 'pointer',
                    marginTop: '58px',
                    width: '165px',
                    position: 'absolute',
                    top: '0',
                    right: '125px'
                }}
                onClick={() => onClose(false)}
            >
                <li className='px-1 py-2'>
                    {authData.role === 'user' ?
                        <Link to="/user/dashboard" className='text-decoration-none text-black'>My Garage</Link> :
                        <Link to="/admin-panel/dashboard/dashboard" className='text-decoration-none text-black'>Admin Garage</Link>
                    }
                </li>
                <li className='px-1 py-2' onClick={() => userLoggedOut()}>Logout</li>
            </div>
        </>
    )
}

export default UserDropDown;

