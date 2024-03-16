import { Button } from '../../components/index';
import { useState } from 'react';
import NewCarModel from './NewCarModel';
// import { getAllCars } from '../../api/cars';

import { useFetchCars } from '../../contexts/CarContext';

const ManageCarsContent = () => {
  const [ openModel , setOpenModel ] = useState(false);

  const  { cars, fetchAllCars  } = useFetchCars();
  // const [ cars, setCars ] = useState([]);

  // useEffect(() => {
  //     const fetchAllCars = async () => {
  //       const result = await getAllCars(); 
  //         console.log(result);
  //         setCars(result);
  //   }

  //   fetchAllCars();
  // }, [])

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
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Plate_no</th>
                  <th>Seats</th>
                  <th>Type</th>
                  <th>Mileage</th>
                  <th>Features</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { cars.map((car) => (
                <tr key={car._id}>
                    <td style={{ fontSize : '13px' }}>{car.brand}</td>
                    <td style={{ fontSize : '13px' }}>{car.model}</td>
                    <td style={{ fontSize : '13px' }}>{car.plateNo}</td>
                    <td style={{ fontSize : '13px' }}>{car.seats}</td>
                    <td style={{ fontSize : '13px' }}>{car.carTypes}</td>
                    <td style={{ fontSize : '13px' }}>{car.mileage}</td>
                    <td style={{ fontSize : '13px' }}>{car.features}</td>
                    <td style={{ fontSize : '13px' }}>{car.price}</td>
                    {/* <td>{car.image}</td> */}
                    <td>
                      <div className="d-flex justify-content-around align-items-center gap-2">
                        <div>
                          <i className="bi bi-trash fs-5" style={{ color : "red", cursor : "pointer"}}></i>
                        </div>
                        <div>
                          <i className="bi bi-box-arrow-up-right" style={{ color : "green", cursor : "pointer"}}></i>
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