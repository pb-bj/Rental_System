// import { toast } from 'react-hot-toast';
// import { Button } from '../components/Button';
// import { useState } from 'react';
// import { carPostRequest } from '../api/cars';
// import { FormInput } from '../components/index';
// import { useFetchCars } from '../contexts/CarContext';
// import { useAuth } from '../contexts/AuthContext';
// import { validateCarDetails } from '../utils/validate';

// const NewCarModel = ({ onCloseModel }) => {
//   const { authToken } = useAuth();
//   const { fetchAllCars, addNewCars } = useFetchCars();

//   const [brand, setBrand] = useState('');
//   const [model, setModel] = useState('');
//   const [plateNo, setPlateNo] = useState('');
//   const [seatsString, setSeatsString] = useState('');
//   const [carTypes, setCarTypes] = useState('');
//   const [mileageString, setMileageString] = useState('');
//   const [features, setFeatures] = useState('');
//   const [priceString, setPriceString] = useState('');
//   const [image, setImage] = useState(null);
//   const [errors, setErrors] = useState({});

//   const seats = Number(seatsString);
//   const mileage = Number(mileageString);
//   const price = Number(priceString);

//  const validationErrors = validateCarDetails(carDetails);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast.error('Please correct the highlighted errors', { duration: 3000 });
//       return;
//     }

//   const formData = new FormData();
//   formData.append('brand', brand);
//   formData.append('model', model);
//   formData.append('plateNo', plateNo);
//   formData.append('seats', seats);
//   formData.append('mileage', mileage);
//   formData.append('price', price);
//   formData.append('carTypes', carTypes);
//   formData.append('features', features);
//   formData.append('image', image);

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const newCarDetails = await carPostRequest(formData, authToken.token);
//       fetchAllCars()
//       addNewCars(newCarDetails);
//       onCloseModel(false);
//       toast.success('Car added successfully', { duration: 3000 });
//     } catch (error) {
//       if (error.repsonse && error.response.data.error === 'Car Already Exist') {
//           toast.error('plate number already exists.', { duration: 3000 });
//       } else {
//          console.error('Error adding car:', error);
//          toast.error('Failed to add car. Please try again later.', { duration: 3000 });
//       }
//     }

//   }
//   return (
//     <>
//       <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog">
//           <div className="modal-content" style={{ width: "700px" }}>
//             <div className="modal-header">
//               <h5 className="modal-title">Create New Car</h5>
//               <button type="button" className="btn-close shadow-none" onClick={() => onCloseModel(false)}></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="d-flex gap-2">
//                   <div className="col-6">
//                     <FormInput label="Brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
//                     {errors.brand && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.brand}</p>}
//                     <FormInput label="Model" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
//                     {errors.model && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.model}</p>}
//                     <FormInput label="Plate Number" type="text" value={plateNo} onChange={(e) => setPlateNo(e.target.value)} />
//                     {errors.plateNo && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.plateNo}</p>}
//                     <FormInput label="Seats" type="text" value={seatsString} onChange={(e) => setSeatsString(e.target.value)} />
//                     {errors.seats && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.seats}</p>}
//                   </div>
//                   <div className="col-6">
//                     <FormInput label="Type" type="text" value={carTypes} onChange={(e) => setCarTypes(e.target.value)} />
//                     {errors.carTypes && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.carTypes}</p>}
//                     <FormInput label="Mileage" type="text" value={mileageString} onChange={(e) => setMileageString(e.target.value)} />
//                     {errors.mileage && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.mileage}</p>}
//                     <FormInput label="Features" type="text" value={features} onChange={(e) => setFeatures(e.target.value)} />
//                     {errors.features && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.features}</p>}
//                     <FormInput label="Price" type="text" value={priceString} onChange={(e) => setPriceString(e.target.value)} />
//                     {errors.price && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.price}</p>}
//                     <FormInput label="Image" type="file" onChange={(e) => setImage(e.target.files[0])} />
//                     {errors.image && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.image}</p>}
//                   </div>
//                 </div>
//                 <div><Button title="Create" type="submit" /></div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewCarModel;

import { toast } from 'react-hot-toast';
import { Button } from '../components/Button';
import { useState } from 'react';
import { carPostRequest } from '../api/cars';
import { FormInput } from '../components/index';
import { useFetchCars } from '../contexts/CarContext';
import { useAuth } from '../contexts/AuthContext';
import { validateCarDetails } from '../utils/validate';

const NewCarModel = ({ onCloseModel }) => {
  const { authToken } = useAuth();
  const { fetchAllCars, addNewCars } = useFetchCars();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [seatsString, setSeatsString] = useState('');
  const [carTypes, setCarTypes] = useState('');
  const [mileageString, setMileageString] = useState('');
  const [features, setFeatures] = useState('');
  const [priceString, setPriceString] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  
  const seats = Number(seatsString);
  const mileage = Number(mileageString);
  const price = Number(priceString);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const carDetails = {
      brand,
      model,
      plateNo,
      seats,
      carTypes,
      mileage,
      features,
      price,
      image,
    };
    
    const validationErrors = validateCarDetails(carDetails);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please correct the highlighted errors', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    Object.keys(carDetails).forEach(key => {
      formData.append(key, carDetails[key]);
    });

    try {
      const newCarDetails = await carPostRequest(formData, authToken.token);
      fetchAllCars();
      addNewCars(newCarDetails);
      onCloseModel(false);
      toast.success('Car added successfully', { duration: 3000 });
    } catch (error) {
      if (error.response && error.response.data.error === 'Car Already Exist') {
        toast.error('Plate number already exists.', { duration: 3000 });
      } else {
        console.error('Error adding car:', error);
        toast.error('Failed to add car. Please try again later.', { duration: 3000 });
      }
    }
  }

  return (
    <>
      <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: "700px" }}>
            <div className="modal-header">
              <h5 className="modal-title">Create New Car</h5>
              <button type="button" className="btn-close shadow-none" onClick={() => onCloseModel(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex gap-2">
                  <div className="col-6">
                    <FormInput 
                      label="Brand" 
                      type="text" 
                      value={brand} 
                      onChange={(e) => setBrand(e.target.value)} 
                    />
                    {errors.brand && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.brand}</p>}
                    
                    <FormInput 
                      label="Model" 
                      type="text" 
                      value={model} 
                      onChange={(e) => setModel(e.target.value)} 
                    />
                    {errors.model && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.model}</p>}
                    
                    <FormInput 
                      label="Plate Number" 
                      type="text" 
                      value={plateNo} 
                      onChange={(e) => setPlateNo(e.target.value)} 
                    />
                    {errors.plateNo && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.plateNo}</p>}
                    
                    <FormInput 
                      label="Seats" 
                      type="text" 
                      value={seatsString} 
                      onChange={(e) => setSeatsString(e.target.value)} 
                    />
                    {errors.seats && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.seats}</p>}
                  </div>
                  <div className="col-6">
                    <FormInput 
                      label="Type" 
                      type="text" 
                      value={carTypes} 
                      onChange={(e) => setCarTypes(e.target.value)} 
                    />
                    {errors.carTypes && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.carTypes}</p>}
                    
                    <FormInput 
                      label="Mileage" 
                      type="text" 
                      value={mileageString} 
                      onChange={(e) => setMileageString(e.target.value)} 
                    />
                    {errors.mileage && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.mileage}</p>}
                    
                    <FormInput 
                      label="Features" 
                      type="text" 
                      value={features} 
                      onChange={(e) => setFeatures(e.target.value)} 
                    />
                    {errors.features && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.features}</p>}
                    
                    <FormInput 
                      label="Price" 
                      type="text" 
                      value={priceString} 
                      onChange={(e) => setPriceString(e.target.value)} 
                    />
                    {errors.price && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.price}</p>}
                    
                    <FormInput 
                      label="Image" 
                      type="file" 
                      onChange={(e) => setImage(e.target.files[0])} 
                    />
                    {errors.image && <p className='text-danger' style={{ fontSize: '14px' }}>{errors.image}</p>}
                  </div>
                </div>
                <div><Button title="Create" type="submit" /></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCarModel;
