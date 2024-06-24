import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { formatedDate } from '../utils/formatedDate';
import emptyBookingImage from '../assets/empty.png';

const UserDashboard = () => {
  const { authData } = useAuth();
  const { userBookings, isLoading, error } = useBooking();

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{ error }</p>
  
  if (!userBookings || userBookings.length === 0) {
    return (
      <section className="container" style={{ marginTop: '95px' }}>
        <h5>Hi, {authData?.fullname}</h5>
        <div className="mt-5 ">
          <img src={emptyBookingImage} className="mx-auto d-block" alt="" width={250}/>
        <p className="fs-5 text-secondary text-center">No any bookings</p>

        </div>
      </section>
    )
  }
  
  return (
    <section className='container' style={{ marginTop: '95px' }}>
      <h5>Hi, {authData?.fullname}</h5>
      <div className="mt-5">
          <table className="table table-striped table-bordered">
          <thead>
            <tr className='text-center'>
              <th>Sn</th>
              <th>Date</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Plate no</th>
              <th>Booking Time</th>
              <th>Duration (Days)</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
                  </thead>
        <tbody>
            {userBookings?.map((booking, i) => (
              <tr key={booking?._id}>
                <td style={{ fontSize: '13px' }}>{i + 1}</td>
                <td style={{ fontSize: '13px' }}>{formatedDate(booking?.bookingDate)}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.brand}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.model}</td>
                 <td style={{ fontSize: '13px' }}>{booking?.car?.plateNo}</td>
                <td style={{ fontSize: '13px' }}>
                  {formatedDate(booking?.tripStartDate)} - {""}{formatedDate(booking?.tripEndDate)}
                </td>
                <td style={{ fontSize: '13px' }}>{booking?.totalTripDays}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.price}</td>
                <td style={{ fontSize: '13px' }}>{booking?.totalPrice}</td>
                <td style={{ fontSize: '13px' }}>
                  <button className="btn btn-danger">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
    </section>
  )
}

export default UserDashboard