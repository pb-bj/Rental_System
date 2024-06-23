// import { Link } from "react-router-dom";
import { formatedDate } from "../utils/formatedDate";
import { useBookings } from '../hooks/useBookings'

const Bookings = () => {
  const { bookings } = useBookings();
  console.log(bookings)
  return (
    <section className="container-fluid mx-0 p-2">
      <h4>Booking List</h4>
        <ul className="d-flex align-items-center gap-5" >
        <li>All Booking <span>2</span></li>
          <li>Pending <span>0</span></li>
          <li>Cancelled <span>2</span></li>
        </ul>
      <table className="table table-striped table-bordered">
          <thead>
            <tr className='text-center'>
              <th>Sn</th>
              <th>Date</th>
              <th>User</th>
              <th>License</th>
              <th>Booking Time</th>
              <th>Address</th>
              <th>Days</th>
              <th>Amount</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Mileage</th>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>
        <tbody>
            {bookings?.map((booking, i) => (
              <tr key={booking?._id}>
                <td style={{ fontSize: '13px' }}>{i + 1}</td>
                <td style={{ fontSize: '13px' }}>{formatedDate(booking?.bookingDate)}</td>
                <td style={{ fontSize: '13px' }}>{booking?.user?.email}</td>
                <td style={{ fontSize: '13px' }}>{booking?.license}</td>
                <td style={{ fontSize: '13px' }}>
                  {formatedDate(booking?.tripStartDate)} - {""}{formatedDate(booking?.tripEndDate)}
                </td>
                <td style={{ fontSize: '13px' }}>{booking?.address}</td>
                <td style={{ fontSize: '13px' }}>{booking?.totalTripDays}</td>
                <td style={{ fontSize: '13px' }}>{booking?.totalPrice}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.brand}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.model}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.mileage}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.carTypes}</td>
                <td style={{ fontSize: '13px' }}>{booking?.car?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  )
};

export default Bookings;