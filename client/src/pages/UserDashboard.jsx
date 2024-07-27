// import { useAuth } from "../contexts/AuthContext";
// import { useBooking } from "../contexts/BookingContext";
// import { formatedDate } from '../utils/formatedDate';
// import emptyBookingImage from '../assets/empty.png';
// import { CancelReasoningBox } from "../components";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetBookingCancellationUser } from "../hooks/useGetBookingCancellationUser";

// const UserDashboard = () => {
//   const { authData } = useAuth();
//   const { userBookings } = useBooking();
//   const { cancellationCount } = useGetBookingCancellationUser();
//   const [showCancelBox, setShowCancelBox] = useState(false);
//   const [activeBooking, setActiveBooking] = useState([]);
//   const [selectedBookingId, setSelectedBookingId] = useState(null);

//   useEffect(() => {
//     if (userBookings) {
//       const active = userBookings.filter(booking => !booking.isCancelled);
//       setActiveBooking(active);
//     }
      
//   }, [userBookings])

//   const handleCancelBooking = (bookingId) => {
//     setSelectedBookingId(bookingId);
//     setShowCancelBox(true)
//   }

//   if (!activeBooking.length ) {
//     return (
//       <section className="container" style={{ marginTop: '95px' }}>
//         <div className="d-flex align-items-center justify-content-between gap-5 w-100 col-12">
//           <h5 className="col-9">Hi, {authData?.fullname}</h5>
//           <div className="col w-100 flex-end">
//             <Link to="/user/dashboard/message">
//               <button className="btn btn-success">Message { cancellationCount }</button>
//               </Link>
//           </div>
//         </div>

//         <div className="mt-5 ">
//           <img src={emptyBookingImage} className="mx-auto d-block" alt="" width={250}/>
//         <p className="fs-5 text-secondary text-center">No any bookings</p>
//         </div>
//       </section>
//     )
//   }
  
//   return (
//     <section className='container' style={{ marginTop: '95px' }}>
//       <h5>Hi, {authData?.fullname}</h5>
//       <div className="mt-5">
//           <table className="table table-striped table-bordered">
//           <thead>
//             <tr className='text-center'>
//               <th>Sn</th>
//               <th>Date</th>
//               <th>Brand</th>
//               <th>Model</th>
//               <th>Plate no</th>
//               <th>Booking Time</th>
//               <th>Duration (Days)</th>
//               <th>Price</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//                   </thead>
//         <tbody>
//             {activeBooking?.map((booking, i) => (
//               <tr key={booking?._id}>
//                 <td style={{ fontSize: '13px' }}>{i + 1}</td>
//                 <td style={{ fontSize: '13px' }}>{formatedDate(booking?.bookingDate)}</td>
//                 <td style={{ fontSize: '13px' }}>{booking?.car?.brand}</td>
//                 <td style={{ fontSize: '13px' }}>{booking?.car?.model}</td>
//                  <td style={{ fontSize: '13px' }}>{booking?.car?.plateNo}</td>
//                 <td style={{ fontSize: '13px' }}>
//                   {formatedDate(booking?.tripStartDate)} - {""}{formatedDate(booking?.tripEndDate)}
//                 </td>
//                 <td style={{ fontSize: '13px' }}>{booking?.totalTripDays}</td>
//                 <td style={{ fontSize: '13px' }}>{booking?.car?.price}</td>
//                 <td style={{ fontSize: '13px' }}>{booking?.totalPrice}</td>
//                 <td style={{ fontSize: '13px' }}>{booking?.status}</td>
//                 <td style={{ fontSize: '13px' }}>
//                     {!booking.isCancelled ? (
//                                         <button className="btn btn-danger" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
//                                     ) : (
//                                         <span className="text-muted">Cancelled</span>
//                                     )}
//                 </td>
//                 {showCancelBox && <CancelReasoningBox onClose={() => setShowCancelBox(false)} bookingId={ selectedBookingId } />}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//           </div>
//     </section>
//   )
// }

// export default UserDashboard

import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { formatedDate } from '../utils/formatedDate';
import emptyBookingImage from '../assets/empty.png';
import { CancelReasoningBox } from "../components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBookingCancellationUser } from "../hooks/useGetBookingCancellationUser";

const UserDashboard = () => {
    const { authData } = useAuth();
    const { userBookings } = useBooking();
    const { cancellationCount } = useGetBookingCancellationUser();
    const [showCancelBox, setShowCancelBox] = useState(false);
    const [activeBooking, setActiveBooking] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        if (userBookings) {
            const active = userBookings.filter(booking => !booking.isCancelled);
            setActiveBooking(active);
        }
    }, [userBookings]);

    const handleCancelBooking = (bookingId) => {
        setSelectedBookingId(bookingId);
        setShowCancelBox(true);
    };

    if (!activeBooking.length) {
        return (
            <section className="container" style={{ marginTop: '95px' }}>
                <div className="d-flex align-items-center justify-content-between gap-5 w-100 col-12">
                    <h5 className="col-9">Hi, {authData?.fullname}</h5>
                    <div className="col-auto">
                        <Link to="/user/dashboard/message">
                            <button className="btn btn-dark position-relative">
                                Message
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                                    {cancellationCount}
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-5">
                    <img src={emptyBookingImage} className="mx-auto d-block" alt="" width={250} />
                    <p className="fs-5 text-secondary text-center">No bookings</p>
                </div>
            </section>
        );
    }

    return (
        <section className='container' style={{ marginTop: '95px' }}>
            <div className="d-flex align-items-center justify-content-between gap-5 w-100 col-12">
                <h5 className="col-9">Hi, {authData?.fullname}</h5>
                <div className="col-auto">
                    <Link to="/user/dashboard/message">
                        <button className="btn btn-info position-relative">
                            Message
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white">
                                {cancellationCount}
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeBooking?.map((booking, i) => (
                            <tr key={booking?._id}>
                                <td style={{ fontSize: '13px' }}>{i + 1}</td>
                                <td style={{ fontSize: '13px' }}>{formatedDate(booking?.bookingDate)}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.car?.brand}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.car?.model}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.car?.plateNo}</td>
                                <td style={{ fontSize: '13px' }}>
                                    {formatedDate(booking?.tripStartDate)} - {formatedDate(booking?.tripEndDate)}
                                </td>
                                <td style={{ fontSize: '13px' }}>{booking?.totalTripDays}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.car?.price}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.totalPrice}</td>
                                <td style={{ fontSize: '13px' }}>{booking?.status}</td>
                                <td style={{ fontSize: '13px' }}>
                                    {!booking.isCancelled ? (
                                        <button className="btn btn-danger" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
                                    ) : (
                                        <span className="text-muted">Cancelled</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showCancelBox && <CancelReasoningBox onClose={() => setShowCancelBox(false)} bookingId={selectedBookingId} />}
        </section>
    );
};

export default UserDashboard;
