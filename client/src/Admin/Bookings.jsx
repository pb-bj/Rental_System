import { formatedDate } from "../utils/formatedDate";
import { useBookings } from '../hooks/useBookings';
import { useState } from "react";
import { CancelReasoningBox } from "../components";

const Bookings = () => {
  const { bookings } = useBookings();
  const [showCancelBox, setShowCancelBox] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelBox(true);
  };

  return (
    <section className="container-fluid mx-0 p-2">
      <h4>Booking List</h4>
      <ul className="d-flex align-items-center gap-5">
        <li>All Booking <span>{bookings.length}</span></li>
        <li>Booked <span>{bookings.filter(booking => !booking.isCancelled).length}</span></li>
        <li>Cancelled <span>{bookings.filter(booking => booking.isCancelled).length}</span></li>
      </ul>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className='text-center'>
            <th>Sn</th>
            <th>Date</th>
            <th>User</th>
            <th>Booking Time</th>
            <th>Days</th>
            <th>Model</th>
            <th>Type</th>
            <th>Price</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking, i) => (
            <tr key={booking?._id}>
              <td style={{ fontSize: '13px' }}>{i + 1}</td>
              <td style={{ fontSize: '13px' }}>{formatedDate(booking?.bookingDate)}</td>
              <td style={{ fontSize: '13px' }}>{booking?.user?.email}</td>
              <td style={{ fontSize: '13px' }}>
                {formatedDate(booking?.tripStartDate)} - {""}{formatedDate(booking?.tripEndDate)}
              </td>
              <td style={{ fontSize: '13px' }}>{booking?.totalTripDays}</td>
              <td style={{ fontSize: '13px' }}>{booking?.car?.model}</td>
              <td style={{ fontSize: '13px' }}>{booking?.car?.carTypes}</td>
              <td style={{ fontSize: '13px' }}>{booking?.car?.price}</td>
              <td style={{ fontSize: '13px' }}>{booking?.totalPrice}</td>
              <td style={{ fontSize: '13px' }}>{booking?.isCancelled ? 'Cancelled' : 'Booked'}</td>
              <td style={{ fontSize: '13px' }}>{booking.isPaid ? 'Paid' : 'Unpaid'}</td>
              <td style={{ fontSize: '13px' }}>
                <button className="btn btn-danger" onClick={() => handleCancelBooking(booking?._id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCancelBox && <CancelReasoningBox onClose={() => setShowCancelBox(false)} bookingId={selectedBookingId} />}
    </section>
  );
};

export default Bookings;
