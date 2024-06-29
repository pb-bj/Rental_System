import { Link } from 'react-router-dom';
import { Button } from './index';

export const Card = ({ items }) => {
    const { _id, brand, model, image, price, carTypes, isAvailable } = items;
    return (
        <div className='shadow-sm rounded border mb-3' style={{ cursor: 'pointer' }} key={_id}>
            <div className='row'>
                <div className='col-12 col-md'>
                    <img
                        className="rounded-start img-fluid img-mobile" // Added img-mobile class
                        src={`${import.meta.env.VITE_APP_BASE_URL}/${image}`} alt=""
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className='col-12 col-md flex'>
                    <div className='p-3'>
                        <span className='fw-lighter'>{brand}</span>
                        <h5 className='fw-bold mb-3'>{model}</h5>
                        {isAvailable ?
                            <span className="bg-success text-white px-2 py-1 rounded" style={{ fontSize: '13.5px' }}>available</span>
                            : <span className="bg-danger text-white px-2 py-1 rounded" style={{ fontSize: '13.5px' }}>unavailable</span>
                        }

                        <div className='d-flex justify-content-between m-2'>
                            {/* <span>
                                4.91 {""}
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                            </span> */}
                            <span >type : {carTypes.toLowerCase()}</span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to={`/vehicles/${_id}`}><Button title="View details" /></Link>
                            <p className='fw-medium'>Rs {price}/ day</p>
                        </div>
                        <div className="text-decoration-underline text-end" style={{ fontSize: '11px' }}>excl. taxes & fees </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

