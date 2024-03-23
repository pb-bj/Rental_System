import { Button } from '../components/index';
import { useEffect, useState } from 'react';
import { updateCarItem, getSingleCar } from '../api/cars';
import { FormInput } from '../components/index';
// import { validateCarDetails } from '../../utils/validate'

const UpdateCarModel = ({ onCloseModel, updateId }) => {
    const [ brand, setBrand ] = useState('');
    const [ model, setModel ] = useState('');
    const [ plateNo, setPlateNo ] = useState('');
    const [ seatsString, setSeatsString ] = useState('');
    const [ carTypes, setCarTypes ] = useState('');
    const [ mileageString, setMileageString ] = useState('');
    const [ features, setFeatures ] = useState('');
    const [ priceString, setPriceString ] = useState('');
    const [ image, setImage ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState({});

    useEffect(() => {
      const fetchSingleCarDetails = async () => {
        const carDetail = await getSingleCar(updateId);
        console.log(carDetail)
        setBrand(carDetail.brand);
        setModel(carDetail.model);
        setPlateNo(carDetail.plateNo);
        setSeatsString(carDetail.seats);
        setCarTypes(carDetail.carTypes);
        setMileageString(carDetail.mileage);
        setFeatures(carDetail.features);
        setPriceString(carDetail.price);
        setImage(carDetail.image);
      }
      
      fetchSingleCarDetails()
    }, [updateId]);

    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const seats = Number(seatsString);
        const mileage = Number(mileageString);
        const price = Number(priceString);
        
        const formData = new FormData();
          formData.append('brand', brand );
          formData.append('model', model );
          formData.append('plateNo', plateNo );
          formData.append('seats', seats );
          formData.append('mileage', mileage );
          formData.append('price', price );
          formData.append('carTypes', carTypes );
          formData.append('features', features );
          formData.append('image', image );
        
          // sending update info
           await updateCarItem(updateId, formData);
      } catch(error) {
          console.error(`Error while updating` ,error);   
        }
    }
    return (
        <>
          <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content" style={{ width : "700px"}}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Car Details</h5>
                  <button type="button" className="btn-close shadow-none" onClick={() => onCloseModel(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                      <div className="d-flex gap-2">
                            <div className="col-6">
                                <FormInput label="Brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                                { errorMessage.brand && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.brand}</p>}
                                <FormInput label="Model" type="text" value={model} onChange={(e) => setModel(e.target.value)}/>
                                { errorMessage.model && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.model}</p>}
                                <FormInput label="Plate Number" type="text" value={plateNo} onChange={(e) => setPlateNo(e.target.value)}/>
                                { errorMessage.plateNo && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.plateNo}</p>}
                                <FormInput label="Seats" type="text" value={seatsString} onChange={(e) => setSeatsString(e.target.value)}/>
                                { errorMessage.seats && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.seats}</p>}
                            </div>
                            <div className="col-6">
                                <FormInput label="Type" type="text" value={carTypes} onChange={(e) => setCarTypes(e.target.value)}/>
                                { errorMessage.carTypes && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.carTypes}</p>}
                                <FormInput label="Mileage" type="text" value={mileageString} onChange={(e) => setMileageString(e.target.value)}/>
                                { errorMessage.mileage && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.mileage}</p>}                              
                                <FormInput label="Features" type="text" value={features} onChange={ (e) => setFeatures(e.target.value) }/>
                                { errorMessage.features && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.features}</p>}                                
                                <FormInput label="Price" type="text" value={priceString} onChange={(e) => setPriceString(e.target.value)}/>
                                { errorMessage.price && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.price}</p>}
                                <FormInput label="Image" type="file"  onChange={(e) => setImage(e.target.files[0])}/>
                                { errorMessage.image && <p className='text-danger' style={{ fontSize : '14px'}}>{errorMessage.image}</p>}
                            </div>
                      </div>
                        <div><Button title="Update" type="submit" /></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default UpdateCarModel;