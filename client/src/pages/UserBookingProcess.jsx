import { useState } from 'react';
import { Button } from '../components/index';
import { useLocation } from 'react-router-dom';
import { formatedDate } from '../utils/formatedDate';
import { useAuth } from '../contexts/AuthContext';
import { bookingRequest } from '../api/booking';

const UserBookingProcess = () => {
  const [bookingProcessData, setBookingProcessData] = useState(null);
  const [userInfoDetail, setUserInfoDetail] = useState({
    address: '',
    license: ''
  });

  const {authData, authToken } = useAuth();
  const location = useLocation();
  const { bookingData = {}, carDetails = {} } = location.state || {}

  if (Object.keys(bookingData).length == 0 || Object.keys(carDetails).length == 0) {
    console.log('Booking details are empty');
  }

  const startDate = bookingData.tripStartDate ? formatedDate(bookingData.tripStartDate) : '';
  const endDate = bookingData.tripEndDate ? formatedDate(bookingData.tripEndDate) : '';
  const totalTripDays = Math.ceil((new Date(bookingData.tripEndDate) - new Date(bookingData.tripStartDate)) / (1000 * 60 * 60 * 24)) + 1;
  const totalAmount = totalTripDays * carDetails?.price;

    const handleChange = (e) => {
      setUserInfoDetail((prev) => ({...prev, [e.target.name] : e.target.value }));
    }

  // sending the booking data to server
  const handleSubmitBookingData = async (e) => {
    e.preventDefault();
    try {
      setBookingProcessData({
        address: userInfoDetail.address,
        license: userInfoDetail.license,
        carId: carDetails._id,
        location: bookingData.pickupLocation,
        tripStartDate: bookingData.tripStartDate,
        tripEndDate: bookingData.tripEndDate,
        totalPrice: totalAmount
      });
  
      await bookingRequest(bookingProcessData, authToken.token);
      console.log('booking data:', bookingProcessData)


    } catch (err) {
      console.log(err);
    }

  }

  
  return (
    <section className='container' style={{ marginTop: '95px', marginBottom : '50px'}}>
      <h3>Booking Process</h3>
        <form className="row g-5" onSubmit={handleSubmitBookingData}>
            <div className="col-md-7 col-lg-8">
              <h6 className="mb-3 mt-3 text-secondary">Personal Details</h6>
                <div className="row g-3">
                    <div className="col-sm-6">
                      <label  className="form-label">Full name</label>
                      <input type="text" className="form-control shadow-none" value={authData?.fullname} readOnly/>
                    </div>
            
                  <div className="col-sm-6">
                      <label  className="form-label">Address</label>
                      <input 
                        type="text"
                        name='address'
                        value={userInfoDetail.address }
                        onChange={handleChange}
                        className="form-control shadow-none"
                        placeholder="Shankhamul, Kathmandu"
                        required
                        autoComplete="off"
                      />
                  </div>
            
                  <div className="col-sm-6">
                      <label  className="form-label">Driving license</label>
                  <input
                    type="text"
                    name='license'
                    value={userInfoDetail.license }
                    onChange={handleChange}
                    className="form-control shadow-none"
                    placeholder="xx-xx-xxxxxxxx"
                    autoComplete="off"
                    required
                  />
                  </div>
            
            {/* vehicles details */}
                <h6 className="mb-2 pt-4 text-secondary">Rental Vehicle Details</h6>
                   <div className="col-sm-6">
              <label className="form-label">Brand</label>
              <input type="text" className="form-control shadow-none"  value={carDetails?.brand} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
              <label className="form-label">Model</label>
                      <input type="text" className="form-control shadow-none"  value={carDetails?.model} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Plate No</label>
                      <input type="text" className="form-control shadow-none" value={carDetails?.plateNo} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Seats</label>
                      <input type="text" className="form-control shadow-none" value={carDetails?.seats} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Type</label>
                      <input type="text" className="form-control shadow-none"  value={carDetails?.carTypes} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Mileage</label>
                      <input type="text" className="form-control shadow-none"  value={carDetails?.mileage} autoComplete="off" readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Price</label>
                      <input type="text" className="form-control shadow-none"  value={carDetails?.price} autoComplete="off" readOnly/>
                   </div>
            
             <h6 className="mb-2 pt-4 text-secondary">Destination Details</h6>
                   <div className="col-sm-6">
                      <label  className="form-label">Trip Start Date</label>
                      <input type="date" className="form-control shadow-none"  value={startDate} readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Trip End Date</label>
                      <input type="date" className="form-control shadow-none"  value={endDate} readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Pickup & Drop-off Location</label>
                      <input type="text" className="form-control shadow-none"  value={bookingData?.pickupLocation} readOnly/>
                    </div>
                   <div className="col-sm-6">
                      <label  className="form-label">Duration</label>
                      <input type="text" className="form-control shadow-none"  value={totalTripDays} autoComplete="off" readOnly/>
                    </div>
              
            <h4 className="mb-2 pt-4">Total Amount: Rs {totalAmount}</h4>
            {/* <h6 className="mb-2 pt-4 text-secondary">Payment Details</h6>
             <div className="my-3">
                  <div className="form-check">
                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="form-check">
                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                  </div>
                  <div className="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required/>
                    <label className="form-check-label" htmlFor="paypal">Fone Pay</label>
                  </div>
            </div> */}
        
            <Button title="Confirm"/>  
            </div>
                     
            
                  {/* <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="text" className="form-control" id="username" placeholder="Username" required />
                    <div className="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-12">
                    <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select className="form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state" required>
                      <option value="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>

                <hr className="my-4"/> */}

                {/* <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="same-address"/>
                  <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                </div>

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="save-info" />
                  <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                </div>

                <hr className="my-4"/>

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                  </div>
                  <div className="form-check">
                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                  </div>
                  <div className="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required/>
                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                    <small className="text-body-secondary">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>

                <hr className="my-4"/> */}

                {/* <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button> */}
            </div>
        </form>
      </section>
  )
}

export default UserBookingProcess