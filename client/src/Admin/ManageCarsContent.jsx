import { Button } from '../components';
import { useState } from 'react';
import NewCarModel from './NewCarModel';
import UpdateCarModel from './UpdateCarModel';

import { useFetchCars } from '../contexts/CarContext';
import DeleteCarModel from './DeleteCarModel';

const ManageCarsContent = () => {
  const [ openModel , setOpenModel ] = useState(false);
  const [ openUpdateModel , setOpenUpdateModel ] = useState(false);
  const [ openDeleteModel , setOpenDeleteModel ] = useState(false);
  const [ updateCarId, setUpdateCarId ] = useState(null);
  const [ deleteCarId, setDeleteCarId ] = useState(null);
  const  { cars, setCars } = useFetchCars();

  const handleUpdateModel = (carId) => {
    setUpdateCarId(carId);
    setOpenUpdateModel(!openUpdateModel)
  }

  const handleDelete = (carId) => {
    setDeleteCarId(carId);
    setOpenDeleteModel(!openUpdateModel)
  }

 
  return (    
    <>
          <section className="container-fluid mx-3 p-3">
            <div className="mb-3" onClick={() => setOpenModel(!openModel) }>
              <Button title="Create New"  />
            </div>
            { openModel && <NewCarModel onCloseModel={setOpenModel} /> }
            { openUpdateModel && <UpdateCarModel onCloseModel={setOpenUpdateModel} updateId={ updateCarId } /> }
            { openDeleteModel && <DeleteCarModel onCloseModel={setOpenDeleteModel} deleteId={ deleteCarId }/>}
            <table className="table table-striped table-bordered">
              <thead>
                <tr className='text-center'>
                  <th>Sn</th>
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
                { cars.map((car,i) => (
                  <tr key={car._id}>
                    <td style={{ fontSize : '13px' }}>{i+1}</td>
                    <td style={{ fontSize : '13px' }}>{car.brand}</td>
                    <td style={{ fontSize : '13px' }}>{car.model}</td>
                    <td style={{ fontSize : '13px' }}>{car.plateNo}</td>
                    <td style={{ fontSize : '13px' }}>{car.seats}</td>
                    <td style={{ fontSize : '13px' }}>{car.carTypes}</td>
                    <td style={{ fontSize : '13px' }}>{car.mileage}</td>
                    <td style={{ fontSize : '13px' }}>{car.features}</td>
                    <td style={{ fontSize : '13px' }}>{car.price}</td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center gap-2">
                        <div onClick={() => handleDelete(car._id) }>
                          <i className="bi bi-trash fs-5" style={{ color : "red", cursor : "pointer"}}></i>
                        </div>
                        <div onClick={() => handleUpdateModel(car._id)}>
                          <i className="bi bi-pencil-square" style={{ color : "green", cursor : "pointer"}}></i>
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