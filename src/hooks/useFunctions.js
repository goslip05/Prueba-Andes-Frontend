import { useEffect } from "react";
import useInformacion from "../hooks/useInformacion";

export const useFunctions = () => {

    const { setTitlePage } = useInformacion();

    const updateTitlePage = (title) => {
        useEffect(() =>{
            setTitlePage(title)
        }, []); 
    }

    return {
        updateTitlePage
    }

}