import checkedImge from '../assets/confirm.png';
import { Link, useLocation } from 'react-router-dom';
// import { getUserPaymentDetail } from '../api/payment';

const PaymentSuccessModal = () => {
  const location = useLocation();
  // const [] = user

  const { amount } = location.state || {};
  return (
    <section className='container' style={{ marginTop: '95px', marginBottom: '50px' }}>
      <div className="text-center d-flex justify-content-center align-items-center m-auto flex-column">
        <div className="mb-3">
          <img src={checkedImge} alt="" width={85} />
        </div>
        <h2>Rs {amount}</h2>
        <span className='text-success fw-semibold fs-3'>Payment Successful</span>
        <div className='text-secondary' style={{ fontSize: '14px'}}>Transaction Number: <span className='fw-bold fw-bold'>#ea45asd56</span></div>
        <p className='mt-4 text-black'>
          A confirmation code will be send to your email <br /> 
          <span className="text-secondary">asd@gmail.com</span>
        </p>
        
        <Link to='/'>
          <button className='btn btn-block text-white mt-3 w-100'
            style={{ backgroundColor: "#8134A6" }}>
            Done</button>
        </Link>

        </div>
    </section>    
  );
};

export default PaymentSuccessModal;
