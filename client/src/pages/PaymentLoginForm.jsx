import { useState } from 'react';
import { Button } from '../components';

const PaymentLoginForm = () => {
  const [formData, setFormData] = useState({
    accountHolder: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <section className='container' style={{ marginTop: '95px', marginBottom: '50px' }}>
      <div className='d-flex align-items-center justify-content-center w-75 mx-auto '>
        <div className='col-md-6'>
          <h5>Login to Proceed with Sajilo Payment</h5>
          <form onSubmit={handleSubmit}>
            <div className='form-group mt-3'>
              <label htmlFor='accountHolder'>Account Holder Name:</label>
              <input
                type='text'
                id='accountHolder'
                name='accountHolder'
                value={formData.accountHolder}
                onChange={handleChange}
                className='form-control shadow-none'
                autoComplete='off'
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='form-control shadow-none'
                autoComplete='off'
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='password'>Pin/Password:</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='form-control shadow-none'
                autoComplete='off'
                required
              />
            </div>
            {/* <button type='submit' className='btn btn-primary mt-3'>
              Login
            </button> */}
            <div className='mt-3'>
            <Button title="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentLoginForm;
