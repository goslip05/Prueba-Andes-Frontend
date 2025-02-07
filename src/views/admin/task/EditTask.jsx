import { useEffect, useState } from "react";
import { useFunctions } from "../../../hooks/useFunctions.js";

//components primereact
import { Dropdown } from 'primereact/dropdown';
import { useNavigate, useParams } from "react-router-dom";


//sweetalert2
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

//configuración de la api
import { getTaskApi, postUpdateTaskApi } from "../../../api/task.js";


export default function EditTask() {
  const { updateTitlePage } = useFunctions();
  const { taskId } = useParams();
  const navigate = useNavigate();

  //actualizar titulo pagina
  updateTitlePage("Editar Tarea");

  const [loadingData, setLoadingData] = useState(true);
  const [infoTask, setInfoTask] = useState([]);
  const [errores, setErrores] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [estados] = useState([
   { label: "PENDIENTE", value: "pendiente" },
   { label: "EN PROGRESO", value: "en progreso" },
   { label: "COMPLETADA", value: "completada" },
 ]);

  //context del modal swall
  const MySwal = withReactContent(Swal);

  const obtenerTask = async () => {
    try {
      setLoadingData(true);
      MySwal.fire({
        icon: "info",
        title: "¡Cargando Información!",
        text: "Espera por favor...",
        timerProgressBar: true,
        allowOutsideClick: false, //false
        didOpen: () => {
          MySwal.showLoading();
        },
      });

      const responseApi = await getTaskApi(taskId);
      console.log(responseApi);
      if (responseApi) {
        setInfoTask(responseApi);
      } else {
        setInfoTask([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      MySwal.close();
      setLoadingData(false);
    }
  };

  // Manejar la acción de actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);
    setErrores([]);

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      due_date: date,
      status: selectedStatus
  };

    //console.log(...formData); // Verificar el contenido de formData aquí
    MySwal.fire({
      title: "¿Confirmas la actualización de la Tarea?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          MySwal.fire({
            icon: "info",
            title: "¡Procesando!",
            text: "Espera por favor...",
            timerProgressBar: true,
            allowOutsideClick: false, //false
            didOpen: () => {
              MySwal.showLoading();
            },
          });

          const responseApi = await postUpdateTaskApi(taskData,taskId);
          if (responseApi.status == 200) {
            MySwal.fire({
               icon: 'success',
               text: 'Actualización Exitosa, redireccionando...',
               showConfirmButton: false,
               allowOutsideClick: true,
               didOpen: () => {
                 MySwal.showLoading();
               },
             });
            // Redireccionar a la nueva ruta
            navigate("/panel/tareas");
          } else {
            MySwal.fire({
              icon: "error",
              title: "Ops!",
              html: responseApi.info,
              confirmButtonColor: "#EF4444",
              confirmButtonText: "Entendido",
              allowOutsideClick: false,
            });
            setErrores(responseApi.errors);
          }
          MySwal.close();
        } catch (error) {
          console.log(error);
          MySwal.fire({
            icon: "error",
            title: "Ops!",
            html: error,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Entendido",
            allowOutsideClick: false,
          });
        }
      }
    });
  };

  //iniciar
  useEffect(() => {
    obtenerTask();
  }, []);

  useEffect(() => {
    if (infoTask) {
      setTitle(infoTask.title || "");
      setDescription(infoTask.description || "");
      setDate(infoTask.due_date || "");
      setSelectedStatus(infoTask.status || "pendiente");

    }
  }, [infoTask]);

  return (
    <div>
      <div className="p-3">
        <h5 className="mb-4 text-gray-800">Editar tarea</h5>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} method="POST">
              <div className="row">
                <div className="col-md-6">
                  <div className="input_class">
                    <div className="form-floating mt-4 mb-3">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label>Titulo</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input_class">
                    <div className="form-floating mt-4 mb-3">
                      <input
                        type="date"
                        className="form-control rounded-pill"
                        name="date"
                        value={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <label>Fecha de finalización</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input_class">
                    <div className="form-floating mt-4 mb-3">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <label>Descripción</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input_class mt-4 mb-3">
                    <Dropdown
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.value)}
                      options={estados}
                      placeholder="Seleccione un estado"
                      className="w-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary rounded-pill" type="submit">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
