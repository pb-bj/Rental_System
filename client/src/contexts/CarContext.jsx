import { createContext, useContext, useEffect, useState } from "react";
import { getAllCars } from "../api/cars";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    const fetchAllCars = async () => {
        const carResults = await getAllCars();
        setCars(carResults);
    }

    useEffect(() => {
        fetchAllCars();
    }, []);


    return <CarContext.Provider value={{ cars, setCars, fetchAllCars }}>{children}</CarContext.Provider>
};

export const useFetchCars = () => {
    return useContext(CarContext);
}



