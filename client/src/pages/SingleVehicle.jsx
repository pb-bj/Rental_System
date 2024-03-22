import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCar } from "../api/cars";
import { Features, Button } from "../components/index";

const SingleVehicle = () => {
    const { carId } = useParams();
    const [ carDetails, setCarDetails ] = useState({});
    const [ tripStart, setTripStart ] = useState('')
    const [ tripEnd, setTripEnd ] = useState('')
    const [ pickupLocation, setPickupLocation ] = useState('')

        
        useEffect(() => {
            const fetchSingleCar = async () => {
                try {
                   const data = await getSingleCar(carId);
                    setCarDetails(data);
                    console.log(data)
                } catch(error) {
                    console.log(error)
                }
            }
            fetchSingleCar()
        }, []);
        // console.log(carDetails)

        return (
            <>
                { carDetails && (
                    <section className="col-12 min-vh-100">
                        <div>
                            <img src={`${import.meta.env.VITE_APP_BASE_URL}/${carDetails.image}`} className="object-fit-cover" style={{ width:'100%', height : '600px'}} alt="" />
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
                                    <span style={{ fontSize : '13px' }} className="text-decoration-underline fw-semibold text-secondary">excl.taxes & fees</span>
                                    <hr/>

                                    <div>
                                        <div className="mb-4">
                                            <span className="fw-semibold">Trip starts</span>
                                            <input type="datetime-local" className="form-control shadow-none p-2"  value={tripStart} onChange={(e) => setTripStart(e.target.value)} />
                                            {/* <DatePicker
                                                selected={tripStart}
                                                onChange={date => setTripStart(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                excludeTimes={[setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]}
                                            /> */}
                                        </div>
                                        <div className="mb-4">
                                            <span className="fw-semibold">Trip ends</span>
                                            <input type="datetime-local" className="form-control shadow-none p-2"  value={tripEnd} onChange={(e) => setTripEnd(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <span className="fw-semibold">Pickup & return location</span>
                                            <input type="text" className="form-control shadow-none p-2" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}/>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            
                                                <Button title="Continue" />
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
