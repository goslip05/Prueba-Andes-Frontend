import { createContext, useState } from "react";

const InformacionContext = createContext();

const InformacionProvider = ({ children }) => {

    const [ titlePage, setTitlePage ] = useState('');

    //actualizar el titulo de la pagina
    document.title= `${titlePage} | Prueba Andes`

    return (
        <InformacionContext.Provider value={{ 
            titlePage,
            setTitlePage
        }}>
            {children}
        </InformacionContext.Provider>
    )
    
}

export {
    InformacionProvider
}

export default InformacionContext