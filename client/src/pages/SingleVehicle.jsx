import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCar } from "../api/cars";
import { Features } from "../components/index";

const SingleVehicle = () => {
    const { carId } = useParams();
    const [carDetails, setCarDetails] = useState({});
    // const [tripStartDate, setTripStartDate] = useState('')
    // const [tripStartTime, setTripStartTime] = useState('')
    // const [tripEndDate, setTripEndDate] = useState('')
    // const [tripEndTime, setTripEndTime] = useState('')
    // const [pickupLocation, setPickupLocation] = useState('');
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
    // console.log(carDetails)

    const bookingDetails = (bookingData) => {
        console.log(bookingData)

    }
    return (
        <>
            {carDetails && (
                <section className="col-12 min-vh-100">
                    <div>
                        <img src={`${import.meta.env.VITE_APP_BASE_URL}/${carDetails.image}`} className="object-fit-cover" style={{ width: '100%', height: '600px' }} alt="" />
                    </div>
                    <div className="container mt-5 p-4">
                        <div className="row">
                            <div className="col-8">
                                <Features
                                    brand={carDetails.brand}
                                    model={carDetails.model}
                                    features={carDetails.features}
                                    seats={carDetails.seats}
                                    carTypes={carDetails.carTypes}
                                    mileage={carDetails.mileage}
                                />
                            </div>
                            <div className="col px-4">
                                <h5 className="pt-4 fw-bold">Rs {carDetails.price} <span className="fw-light fs-6">/day</span></h5>
                                <span style={{ fontSize: '13px' }} className="text-decoration-underline fw-semibold text-secondary">excl.taxes & fees</span>
                                <hr />

                                <div>
                                    <div className="mb-4">
                                        <span className="fw-semibold">Trip starts</span>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="date" className="form-control shadow-none p-2" name="tripStartDate" onChange={handleBookingData} />
                                            </div>
                                            <div className="col-6">
                                                <input type="time" className="form-control shadow-none p-2" name="tripStartTime" onChange={handleBookingData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <span className="fw-semibold">Trip ends</span>
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="date" className="form-control shadow-none p-2" name="tripEndDate" onChange={handleBookingData} />
                                            </div>
                                            <div className="col-6">
                                                <input type="time" className="form-control shadow-none p-2" name="tripEndTime" onChange={handleBookingData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <span className="fw-semibold">Pickup & return location</span>
                                        <input type="text" className="form-control shadow-none p-2" name="pickupLocation" onChange={handleBookingData} />
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">

                                        <button className="btn btn-primary" onClick={() => bookingDetails(bookingData)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            )}
        </>
    )
}

export default SingleVehicle
