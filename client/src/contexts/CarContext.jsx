import { createContext, useContext, useEffect, useState } from "react";
import { getAllCars } from "../api/cars";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [ cars, setCars ] = useState([]);

    useEffect(() => {
        const fetchAllCars = async () => {
            const carResults = await getAllCars();
                setCars(carResults);
        }
        fetchAllCars();
    }, []);

    return <CarContext.Provider value={{ cars, setCars, }}>{children}</CarContext.Provider>
};

export const useFetchCars = () => {
   return useContext(CarContext);
}



