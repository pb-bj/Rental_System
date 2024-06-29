import { useLocation } from 'react-router-dom';
import { formatedDate } from '../utils/formatedDate';
import { useAuth } from '../contexts/AuthContext';
import { bookingRequest } from '../api/booking';
import { useState, useEffect } from 'react';
import { bookingValidation } from '../utils/validate';
import { toast } from 'react-hot-toast';

const UserBookingProcess = () => {
   const [userInfoDetail, setUserInfoDetail] = useState({
    dob: '',
    license: '',
    gender: '',
   });
  const [errors, setErrors] = useState({
    dob: '',
    license: '',
    gender : '',
  });
  
  const { authData, authToken } = useAuth();
  const location = useLocation();
  const { bookingData, carDetails } = location.state || {}
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (Object.keys(bookingData).length == 0 || Object.keys(carDetails).length == 0) {
    console.log('Booking details are empty');
  }

  const startDate = bookingData.tripStartDate ? formatedDate(bookingData.tripStartDate) : '';
  const endDate = bookingData.tripEndDate ? formatedDate(bookingData.tripEndDate) : '';
  const totalTripDays = Math.ceil((new Date(bookingData.tripEndDate) - new Date(bookingData.tripStartDate)) / (1000 * 60 * 60 * 24)) + 1;
  const totalAmount = totalTripDays * carDetails?.price;

  const handleChange = (e) => {
    setUserInfoDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prevErrors) => ({...prevErrors, [e.target.name] : ''}))
    }

  // sending the booking data to server
  const handleSubmitBookingData = async (e) => {
    e.preventDefault();
    const validation = bookingValidation(userInfoDetail);

    try {
      // checking if any errors occurs
      if (Object.keys(validation).length > 0) {
        setErrors(validation);
        toast.error('Invalid data found')
        console.log('user booking error', validation);
        return;
      }

      if (bookingSubmitted) {
        toast.error('Booking has already been submitted.');
        return;
      }

      setBookingSubmitted(true);

      const sendBookingData = {
        dob: userInfoDetail.dob,
        gender: userInfoDetail.gender,
        license: userInfoDetail.license,
        carId: carDetails._id,
        location: bookingData.pickupLocation,
        tripStartDate: bookingData.tripStartDate,
        tripEndDate: bookingData.tripEndDate,
        totalPrice: totalAmount
      };
      
       const delayedPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        bookingRequest(sendBookingData, authToken.token)
          .then(resolve)
          .catch(reject);
      }, 2000); // 2000 ms delay
       });
      
      toast.promise(
        delayedPromise,
        {
          loading: 'Booking in progress...',
          success: 'Booking successful!',
          error: 'Failed to book. Please try again.',
        }
      )
    } catch(err) {
      console.log(err);
      toast.error('Failed to book. Please try again.');
      setBookingSubmitted(false); 
    }

  }

  const isFormValid = Object.values(errors).every((error) => !error);
  return (
    <section className='container' style={{ marginTop: '95px', marginBottom : '50px'}}>
      <h3>Booking Process</h3>
      <form onSubmit={handleSubmitBookingData} className="row g-5">
        <div className="col-md-7 col-lg-8">
          <h6 className="mb-3 mt-3 text-secondary">Personal Details</h6>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Full name</label>
              <input type="text" className="form-control shadow-none" value={authData?.fullname} readOnly />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Date of Birth</label>
              <input 
                type="date"
                className="form-control shadow-none"
                name="dob"
                value={userInfoDetail?.dob}
                onChange={handleChange}
                placeholder="DD-MM-YYYY"
                autoComplete="off"
              />
            {errors.dob && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.dob}</div>}
            </div>

            <div className="col-sm-6">
              <label className="form-label">Gender</label>
              <select selected className="form-select shadow-none" value={userInfoDetail?.gender} name="gender" onChange={handleChange}>
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            {errors.gender && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.gender}</div>}

            </div>

            <div className="col-sm-6">
              <label className="form-label">Driving license</label>
              <input type="text" className="form-control shadow-none" name="license" value={userInfoDetail?.license} onChange={ handleChange} placeholder='xx-xx-xxxxxxxx' autoComplete="off" />
              {errors.license && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.license}</div>}
            </div>

            <h6 className="mb-2 pt-4 text-secondary">Rental Vehicle Details</h6>
            <div className="col-sm-6">
              <label className="form-label">Brand</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.brand} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Model</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.model} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Plate No</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.plateNo} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Seats</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.seats} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Type</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.carTypes} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Mileage</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.mileage} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Price</label>
              <input type="text" className="form-control shadow-none" value={carDetails?.price} readOnly />
            </div>

            <h6 className="mb-2 pt-4 text-secondary">Destination Details</h6>
            <div className="col-sm-6">
              <label className="form-label">Trip Start Date</label>
              <input type="date" value={startDate} className="form-control shadow-none" readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Trip End Date</label>
              <input type="date"  className="form-control shadow-none" value={endDate} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Pickup & Drop-off Location</label>
              <input type="text" className="form-control shadow-none" value={bookingData?.pickupLocation} readOnly />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Duration</label>
              <input type="text" className="form-control shadow-none" value={totalTripDays} readOnly />
            </div>

            <h4 className="mb-2 pt-4">Total Amount: Rs. {totalAmount}</h4>
            <div className="col-12">
               <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormValid || bookingSubmitted}
              >
                {bookingSubmitted ? 'Booking Submitted' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default UserBookingProcess;