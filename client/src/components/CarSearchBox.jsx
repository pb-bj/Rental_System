const CarSearchBox = () => {
    return (
        <form className="container bg-dark px-3 py-4 rounded" >
            <div className="d-flex flex-wrap" style={{ maxWidth: '1200px' }}>
                <div className="col-md-3 col-lg-4 col-8 mb-2">
                    <input type="text" placeholder="Pickup Location" className="input-group shadow-none p-1" />
                </div>
                <div className="col-md-3 col-lg-4 col-8 mb-2">
                    <input type="date" className="input-group  shadow-none p-1" />
                </div>
                <div className="col-md-3 col-lg-4 col-8 mb-2">
                    <input type="time" className="input-group shadow-none p-1" />
                </div>
                <div className="col-md-3 col-lg-3 col-8 mb-2">
                    <input type="date" className="input-group shadow-none p-1" />
                </div>

                <div className="col-md-1 col-3">
                    <input type="button" className="form-control shadow-none p-1" value="Find" />
                </div>
            </div>
        </form>
    );
}

export default CarSearchBox;

