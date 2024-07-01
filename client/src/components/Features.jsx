export const Features = ({ brand, model, features, seats, carTypes, mileage }) => {
    return (
        <>
            <span>{brand}</span>
            <h1 className="fw-bold fs-1">{model}</h1>
            <span className="fw-lighter text-secondary ">Type : {carTypes}</span>
            <div className=" d-flex justify-content-between align-items-center mt-4 col-6">
                <div>
                    <i className="bi bi-clipboard-data"></i>{""} {mileage} mileage
                </div>
                <div>
                    <i className="bi bi-car-front-fill"></i>{""} {seats} seats
                </div>
            </div>
            <div className="mt-4 mb-3">
                <span className="fw-bold fs-5 ">Features : </span>
                <p> {features}</p>
            </div>
            <div className="col-10">
                <span className="fw-bold fs-5">Description :</span><br />
                <span className="text-justify">
                    {brand} {model} is conveniently available, and all of SF/ SF Airport
                    Low mileage, well-equipped, automatic transmission, brand new reliable vehicle,
                    apple car play equipped, android auto equipped, standard safety features, automated
                    cruise control, pre-collision warning, satellite radio, rear defrosters, lane departure
                    warning, and four-cylinder engine {mileage} mpg highway
                </span>
            </div>

        </>
    )
}