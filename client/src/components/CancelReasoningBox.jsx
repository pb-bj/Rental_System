// import { Button } from "./index";
// import { useState } from "react";
// import { useBooking } from "../contexts/BookingContext";

// const CancelReasoningBox = ({ onClose, bookingId }) => {
//   const [cancelledData, setCancelledData] = useState('');
//   const { cancelBooking } = useBooking()

//   const handleCancellationReason = async (e) => {
//     e.preventDefault()
//     try {
//       const result = await cancelBooking( bookingId, cancelledData )
//       console.log(result);
//     } catch (err) {
//         console.log(err)
//     }
//   }

//   return (
//       <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '95px' }}>
//         <div className="modal-dialog">
//           <div className="modal-content" style={{ width: "550px" }}>
//             <div className="modal-header">
//               <h5 className="modal-title">Are you sure want to cancel the booking ? </h5>
//               <button type="button" className="btn-close shadow-none" onClick={() => onClose(true)}></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleCancellationReason}>
//                 <div className="d-flex flex-column gap-2 text-center">
//                 <h6 className="text-center">Cancel Reason</h6>
//                 <input
//                   type="text"
//                   className="form-control shadow-none mb-4"
//                   value={ cancelledData }
//                   onChange={(e) => setCancelledData(e.target.value)}
//                 />
//                 </div>
//               <div><Button title="Send" /></div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default CancelReasoningBox

import { Button } from "./index";
import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import toast from "react-hot-toast";

const CancelReasoningBox = ({ onClose, bookingId }) => {
  const [cancelledData, setCancelledData] = useState('');
  const { cancelBooking } = useBooking();

  const handleCancellationReason = async (e) => {
    e.preventDefault();
    try {
      toast.promise(
        cancelBooking(bookingId, cancelledData),
        {
          loading: 'Cancelling...',
          success: 'Booking cancelled successfully!',
          error: 'Error cancelling booking',
        }
      ).then(result => {
        console.log(result);
        onClose(true); // Close the modal on success
      });
    } catch (err) {
      console.log(err);
      toast.error('Error cancelling booking');
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '95px' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ width: "550px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Are you sure you want to cancel the booking?</h5>
            <button type="button" className="btn-close shadow-none" onClick={() => onClose(true)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCancellationReason}>
              <div className="d-flex flex-column gap-2 text-center">
                <h6 className="text-center">Cancel Reason</h6>
                <input
                  type="text"
                  className="form-control shadow-none mb-4"
                  value={cancelledData}
                  onChange={(e) => setCancelledData(e.target.value)}
                  required
                />
              </div>
              <div>
                <Button title="Send" disabled={!cancelledData} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelReasoningBox;
