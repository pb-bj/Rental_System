import { Card } from '../components/index'
import { useFetchCars } from '../contexts/CarContext';

const Vehicles = () => {
    const { cars } = useFetchCars();
    return (
        <section className='container' style={{ marginTop : '95px'}}>
        <h2 className='text-center m-4'>Select your vehicles</h2>
        <p>({cars.length}) cars available</p>
         <div className='row '>
            { cars.map((car) => (
            <div className='col-6' key={car._id}>
                <Card items={car} />
            </div>
            ))}
        </div>
        </section>
    )
}

export default Vehicles;