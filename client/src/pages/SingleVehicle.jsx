import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCar } from "../api/cars";
import { Features } from "../components/index";
import { validateBooking } from "../utils/validate";

const SingleVehicle = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState({});
    const [bookingData, setBookingData] = useState({
        tripStartDate: '',
        tripEndDate: '',
        pickupLocation: '',
    });
     const [errors, setErrors] = useState({
        tripStartDate: '',
        tripEndDate: '',
        pickupLocation: '',
    });

    const handleBookingData = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    }
    
    
    // for submitting the data to another page 
    const handleSubmitbookingDetails = (e) => {
        e.preventDefault();

        const validation = validateBooking(bookingData);
        console.log(bookingData)
        if (Object.keys(validation).length === 0) {
            navigate('/vehicles/booking', {
                state: {
                    bookingData,
                    carDetails,
                }
            })
        } else {
            console.log('error', validation)
            setErrors(validation);
        }

    }

    useEffect(() => {
        const fetchSingleCar = async () => {
            try {
                const data = await getSingleCar(carId);
                setCarDetails(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCar()
    }, [carId]);
    

    return (
        <section className="container mt-5">
            {carDetails && (
                <div className="row">
                    {/* Image Banner */}
                    <div className="col-md-12">
                        <img src={`${import.meta.env.VITE_APP_BASE_URL}/${carDetails.image}`} className="img-fluid rounded" alt={carDetails.brand} />
                    </div>

                    <div className="col-md-12 col-lg-12">
                        <div className="row">

                            {/* Left Section */}
                            <div className="col-md-12 col-lg-7">
                                <div className="p-4">
                                     
                                    
                                    <Features
                                        brand={carDetails.brand}
                                        model={carDetails.model}
                                        features={carDetails.features}
                                        seats={carDetails.seats}
                                        carTypes={carDetails.carTypes}
                                        mileage={carDetails.mileage}
                                    />
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="col-md-12 col-lg-5">
                                <form className="p-4">
                                    <div className="mt-4 d-flex justify-content-between ">
                                        <div>
                                        <h5 className="fw-bold">Rs {carDetails.price} <span className="fw-light fs-6">/day</span></h5>
                                        <p className="text-muted" style={{ fontSize: '13px' }}>excl. taxes & fees</p>
                                        </div>
                                        <div>
                                         {carDetails.isAvailable ?
                                            <span className="bg-success text-white px-2 py-1 rounded" style={{ fontSize: '13.5px' }}>available</span>
                                            : <span className="bg-danger text-white px-2 py-1 rounded" style={{ fontSize: '13.5px' }}>unavailable</span>}   
                                       </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Trip starts</span>
                                        <div className="row">
                                            <div className="col">
                                                <input type="date" className="form-control shadow-none p-2" name="tripStartDate" value={bookingData.tripStartDate }  onChange={handleBookingData} />
                                                 {errors.tripStartDate && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.tripStartDate}</div>}
                                            </div>
                                          
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Trip ends</span>
                                        <div className="row">
                                            <div className="col">
                                                <input type="date" className="form-control shadow-none p-2" name="tripEndDate" value={bookingData.tripEndDate} onChange={handleBookingData} />
                                                {errors.tripEndDate && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.tripEndDate}</div>}
                                            </div>
                                          
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Pickup & return location</span>
                                        <input type="text" className="form-control shadow-none p-2" name="pickupLocation" value={bookingData.pickupLocation} onChange={handleBookingData} />
                                        {errors.pickupLocation && <div className="text-danger" style={{ fontSize: '13px' }}>{errors.pickupLocation}</div>}
                                    </div>
                                        <div className="d-grid gap-2" >
                                        <button
                                            type="button"
                                            className="btn text-white"
                                            style={{ backgroundColor: "#8134A6" }}
                                            onClick={handleSubmitbookingDetails}
                                            disabled={!carDetails.isAvailable}
                                            
                                        >Book now</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default SingleVehicle;