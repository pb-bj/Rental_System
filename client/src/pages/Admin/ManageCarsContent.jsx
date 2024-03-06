import { Link } from "react-router-dom"

const ManageCarsContent = () => {
  return (
    <>
          <section className="container-fluid mx-3 p-3">
            {/* Car Details Table */}
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th>brand</th>
                  <th>model</th>
                  <th>plate_no</th>
                  <th>seats</th>
                  <th>type</th>
                  <th>mileage</th>
                  <th>features</th>
                  <th>price</th>
                  <th>images</th>

                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Toyota Camry</td>
                  <td>Toyota</td>
                  <td>2022</td>
                </tr>
              </tbody>
            </table>
          </section>
    </>
  )
}

export default ManageCarsContent