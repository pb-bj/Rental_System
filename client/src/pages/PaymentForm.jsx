import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentPostRequest } from '../api/payment';
import { getUserBookingsRequest } from '../api/booking';
import { useAuth } from '../contexts/AuthContext';

const PaymentForm = () => {
  const { authData, authToken } = useAuth();
  const [formData, setFormData] = useState({
    userId: '',
    amount: '',
    bookingId: ''
  });

  const location = useLocation();
  const { amount } = location.state || {}

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserBooking = async () => {
      const data = await getUserBookingsRequest(authToken.token);
      if (data.bookings.length > 0) {
        const id = data.bookings[0]._id
        console.log("booking id :", id)  
        setFormData({
          userId: authData?.id,
          amount: amount || '',
          bookingId: id || ''
        });
      }
    }

    fetchUserBooking()
  }, [authData, amount, authToken.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await paymentPostRequest(formData, authToken.token);
      console.log("Payment detail: ", result);
      if (result) {
        navigate('/payment/process/success', { 
          state: {
            amount : formData.amount,
          }
        });
      }
      
    } catch (err) {
      console.log('Error while payment ', err);
    }
  };

  return (
    <section className='container' style={{ marginTop: '95px', marginBottom: '50px' }}>
      <div className='row bg-light p-4 rounded'>
        <h4>Sajilo Payment</h4>
        <p className='mb-5 text-secondary'>make payment more easier</p>
        <div className='col-md-6'>
          <h5>Payment Details</h5>
          <div className='card'>
            <div className='card-body text-center'>
              <span>Total Amount</span>
              <h2 className='card-text fw-bold pt-2 py-5'> Rs { amount }</h2>
              <hr className='text-secondary'/>
            </div>
          </div>
        </div>
        <div className='col-md-5'>
          <h5>Customer Details</h5>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
              <label htmlFor='accountHolder' className='py-2'>Account Holder Name:</label>
              <input
                type='text'
                name='accountHolder'
                value={authData?.fullname}
                className='form-control shadow-none'
                readOnly
              />
            </div>

            <div className='col-12'>
              <button
                type='submit'
                className='btn btn-block text-white mt-3 w-100'
                style={{ backgroundColor: "#8134A6" }}
              >
              Make Payment
            </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentForm;
