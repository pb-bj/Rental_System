const Bookings = () => {
  return (
    <section className="container-fluid mx-3 p-3">
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
              <th>Booking Time</th>
              <th>Days</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {cars.map((car, i) => (
              <tr key={car._id}>
                <td style={{ fontSize: '13px' }}>{i + 1}</td>
                <td style={{ fontSize: '13px' }}>{car.brand}</td>
                <td style={{ fontSize: '13px' }}>{car.model}</td>
                <td style={{ fontSize: '13px' }}>{car.plateNo}</td>
                <td style={{ fontSize: '13px' }}>{car.seats}</td>
                <td style={{ fontSize: '13px' }}>{car.carTypes}</td>
                <td style={{ fontSize: '13px' }}>{car.mileage}</td>
                <td style={{ fontSize: '13px' }}>{car.features}</td>
                <td style={{ fontSize: '13px' }}>{car.price}</td>
                <td>
                  <div className="d-flex justify-content-around align-items-center gap-2">
                    button
                    </div>
                    
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>
  )
};

export default Bookings;