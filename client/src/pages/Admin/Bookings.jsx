import { useState, useEffect } from 'react';
import { getAllCars } from '../../api/cars';

const Bookings = () => {
  const [ cars, setCars ] = useState([]);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch(error) {
        console.log(error);
      }
    }
    fetchCars()
  }, [])
  return (
    <div>
        <h2></h2>



        { cars.map((car) => (
          <>
          <h2>{car.brand}</h2>
          <img src={car.image} alt="" />
          </>
        ))}
    </div>
  )
}

export default Bookings