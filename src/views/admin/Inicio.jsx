import { useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { useFunctions } from "../../hooks/useFunctions";

export default function Inicio() {

  const { updateTitlePage } = useFunctions();
  
  //actualizar titulo pagina
  updateTitlePage('Inicio');

  const MySwal = withReactContent(Swal)

  useEffect(() => {
    MySwal.close()
  }, [])

  return (
    <div className="p-3">
      <h1 className="h3 mb-4 text-gray-900">Bienvenido al Sistema</h1>
      <p className="mb-4">
          Bienvenido al sistema de Administracion de tareas de Andes
      </p>
    </div>
  )
}
