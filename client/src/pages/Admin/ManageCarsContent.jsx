import { Button } from '../../components/index';
import { useState, useEffect } from 'react';
import NewCarModel from './NewCarModel';
import { getAllCars } from '../../api/cars';

const ManageCarsContent = () => {
  const [ openModel , setOpenModel ] = useState(false);
  const [ cars, setCars ] = useState([]);

  useEffect(() => {
      const fetchAllCars = async () => {
        const result = await getAllCars(); 
          console.log(result);
          setCars(result);
    }

    fetchAllCars();
  }, [])

  return (
    <>
          <section className="container-fluid mx-3 p-3">
            <div className="mb-3" onClick={() => setOpenModel(!openModel) }>
              <Button title="Create New"  />
            </div>
            { openModel && <NewCarModel onCloseModel={setOpenModel} /> }
            <table className="table table-striped table-bordered">
              <thead>
                <tr className='text-center'>
                  <th>brand</th>
                  <th>model</th>
                  <th>plate_no</th>
                  <th>seats</th>
                  <th>type</th>
                  <th>mileage</th>
                  <th>features</th>
                  <th>price</th>
                  {/* <th>images</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { cars.map((car) => (
                <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.plateNo}</td>
                    <td>{car.seats}</td>
                    <td>{car.carTypes}</td>
                    <td>{car.mileage}</td>
                    <td>{car.features}</td>
                    <td>{car.price}</td>
                    {/* <td>{car.image}</td> */}
                    <td>
                      <div className="d-flex justify-content-around align-items-center gap-2">
                        <div>
                          <i class="bi bi-trash fs-5" style={{ color : "red", cursor : "pointer"}}></i>
                        </div>
                        <div>
                          <i class="bi bi-box-arrow-up-right" style={{ color : "green", cursor : "pointer"}}></i>
                        </div>
                      </div>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </section>
    </>
  )
}

export default ManageCarsContent