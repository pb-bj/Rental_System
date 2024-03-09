import { createContext, useContext, useEffect, useState } from "react";
import { getAllCars  } from "../api/cars";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [ cars, setCars ] = useState([]);

    const fetchAllCars = async () => {
        const response = await getAllCars();
            setCars(response);
    }

    useEffect(() => {
        fetchAllCars();
    }, []);

    return <CarContext.Provider value={{ fetchAllCars, cars }}>{children}</CarContext.Provider>
};

export const useFetchCars = () => {
   return useContext(CarContext);
}



