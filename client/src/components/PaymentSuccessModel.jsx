import checkedImge from '../assets/confirm.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePayment from '../hooks/usePayment';
import HashLoader from "react-spinners/HashLoader";

const PaymentSuccessModal = () => {
  const { userPayments } = usePayment();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleOnClick = () => navigate('/');

  return (
    <section className='container' style={{ marginTop: '95px', marginBottom: '50px' }}>
      {loading && (
        <div className="d-flex justify-content-center align-items-center mx-auto">
          <HashLoader color={"#8134A6"} loading={loading} size={150}  style={{ marginTop: '30px'}}/>
        </div>
      )}

      {!loading && userPayments.length > 0 && userPayments.map(payment => (
        <div key={payment?._id} className="text-center d-flex justify-content-center align-items-center m-auto flex-column">
          <div className="mb-3">
            <img src={checkedImge} alt="" width={85} />
          </div>
          <h2>Rs {payment?.amount}</h2>
          <span className='text-success fw-semibold fs-3'>Payment Successful</span>
          <div className='text-secondary' style={{ fontSize: '14px' }}>
            Transaction Number: <span className='fw-bold'>#{payment?._id}</span>
          </div>
          <p className='mt-4 text-black'>
            A confirmation code will be sent to your email <br />
            <span className="text-secondary">{payment?.user?.email}</span>
          </p>
          
            <button onClick={ handleOnClick } className='btn btn-block text-white mt-3' style={{ backgroundColor: "#8134A6", width: '400px' }}>
              Done
            </button>
        </div>
      ))}
      {!loading && userPayments.length === 0 && (
        <div className="text-center">
          <p>No payment details available.</p>
        </div>
      )}
    </section>
  );
};

export default PaymentSuccessModal;
