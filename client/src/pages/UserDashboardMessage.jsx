import { useGetBookingCancellationUser } from '../hooks/useGetBookingCancellationUser';

const UserDashboardMessage = () => {
    const { cancellations } = useGetBookingCancellationUser();
    if (cancellations.length === 0) {
        return (
            <section className="container p-2 mx-auto">
                <h4 className='py-3'>Message Box</h4>
                <div className="alert alert-info" role="alert">
                    No cancellations by admin yet.
                </div>
            </section>
        );
    }

    return (
        <section className="container p-2 mx-auto">
            <h4 className='py-3'>Message Box</h4>
            <div>
                {cancellations.map((cancelled, i) => (
                    <div key={cancelled?._id} className="alert" style={{ backgroundColor: "#CCCC " }}>
                        <h5 className="alert-heading">Cancellation {i + 1}</h5>
                        <p><strong>From :</strong> {cancelled?.cancelledBy}</p>
                        <p><strong>To user:</strong> {cancelled?.email}</p>
                        <p><strong>Cancellation car model:</strong> {cancelled?.model}</p>
                        <p><strong>Reason:</strong> {cancelled?.cancellationReason}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UserDashboardMessage