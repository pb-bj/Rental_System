import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCar } from "../api/cars";
import { Features } from "../components/index";

const SingleVehicle = () => {
    const { carId } = useParams();
    const [carDetails, setCarDetails] = useState({});
    const [bookingData, setBookingData] = useState({
        tripStartDate: '',
        tripStartTime: '',
        tripEndDate: '',
        tripEndTime: '',
        pickupLocation: '',
    });

    const handleBookingData = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
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

    const bookingDetails = (bookingData) => {
        console.log(bookingData)
    }

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
                                    <h3 className="fw-bold">{carDetails.brand}</h3>
                                    <h4 className="fw-normal">{carDetails.model}</h4>
                                    <Features
                                        features={carDetails.features}
                                        seats={carDetails.seats}
                                        carTypes={carDetails.carTypes}
                                        mileage={carDetails.mileage}
                                    />
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="col-md-12 col-lg-5">
                                <div className="p-4">
                                    <div className="mt-4">
                                        <h5 className="fw-bold">Rs {carDetails.price} <span className="fw-light fs-6">/day</span></h5>
                                        <p className="text-muted" style={{ fontSize: '13px' }}>excl. taxes & fees</p>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Trip starts</span>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="date" className="form-control shadow-none p-2" name="tripStartDate" onChange={handleBookingData} />
                                            </div>
                                            <div className="col-6">
                                                <input type="time" className="form-control shadow-none p-2" name="tripStartTime" onChange={handleBookingData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Trip ends</span>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="date" className="form-control shadow-none p-2" name="tripEndDate" onChange={handleBookingData} />
                                            </div>
                                            <div className="col-6">
                                                <input type="time" className="form-control shadow-none p-2" name="tripEndTime" onChange={handleBookingData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="fw-bold">Pickup & return location</span>
                                        <input type="text" className="form-control shadow-none p-2" name="pickupLocation" onChange={handleBookingData} />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" onClick={() => bookingDetails(bookingData)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default SingleVehicle;



