import { useEffect, useState } from "react";
import { cancellationReportRequest } from "../api/booking";
import { useAuth } from "../contexts/AuthContext";

const CancellationBookingDetails = () => {
  const [cancellations, setCancellations] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchAllUserCancellatioData = async () => {
      try {
        const data = await cancellationReportRequest(authToken.token);
          setCancellations(data.cancelledBookings);
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllUserCancellatioData();
  }, [])
  return (
     <section className="container-fluid mx-0 p-2">
      <h4>Cancellation Reports</h4>
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th style={{ fontSize: '13px', maxWidth: '55px' }}>Sn</th>
              <th style={{ maxWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Email</th>
              <th style={{ maxWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Model</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {cancellations?.map((cancelled, i) => (
              <tr key={cancelled?._id}>
                <td style={{ fontSize: '13px', maxWidth: '55px' }}>{i + 1}</td>
                <td style={{ fontSize: '13px', maxWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cancelled?.email}
                </td>
                <td style={{ fontSize: '13px', maxWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cancelled?.model}
                </td>
                <td style={{ fontSize: '13px', whiteSpace: 'normal' }}>
                  {cancelled?.cancellationReason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CancellationBookingDetails