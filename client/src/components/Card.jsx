import { Link } from 'react-router-dom';
import { Button } from './index';

export const Card = ( { items }) => {
    const { _id, brand, model, image, price, carTypes } = items
    return (
        <div className='d-flex rounded border mb-3' style={{ cursor : 'pointer'}} key={_id}>
            <div className='col'>
                <img  
                    className="rounded-start" 
                    style={{ maxWidth:'280px', height : '170px', width : '100%' }}
                    // style={{ maxWidth: '100%', height : 'auto', width: '100%' }}  
                    src={`${import.meta.env.VITE_APP_BASE_URL}/${image}`} alt="" />
            </div>
            <div className='col-6 py-2 px-3'>
                <span className='fw-lighter'>{brand}</span>
                <h5 className='fw-bold mb-3'>{model}</h5>
                <div className='d-flex justify-content-between m-2'>
                    <span>
                        4.91 {""}
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span >type : {carTypes.toLowerCase()}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to={`/vehicles/${_id}`}><Button title="View details" /></Link>
                    {console.log(_id)}
                    <p className='fw-medium'>Rs {price}/ day</p>
                </div>
                <div className="text-decoration-underline text-end" style={{ fontSize : '11px'}}>excl. taxes & fees </div>
            </div>
        </div>
    )
};