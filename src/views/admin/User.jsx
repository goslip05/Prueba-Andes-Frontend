import { useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions.js";

import { useNavigate } from "react-router-dom";

//sweetalert2
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth.js";

export default function User() {
  const { updateTitlePage } = useFunctions();
  const navigate = useNavigate();
  const { user } = useAuth({ middleware: "auth" });
  console.log(user.roles[0].name);

  //actualizar titulo pagina
  updateTitlePage("Usuario");

  const [loadingData, setLoadingData] = useState(true);
  const [infoTask, setInfoTask] = useState([]);
  const [errores, setErrores] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  //context del modal swall
  const MySwal = withReactContent(Swal);

  return (
    <div>
      <div className="p-3">
        <h5 className="mb-4 text-gray-800">Información de usuario</h5>
        <div className="row">

            <div className="col-12 col-md-3 mt-3">
              <div className="mb-3">
                <label
                  htmlFor="inputEmail4"
                  className="form-label"
                  style={{ display: "block" }}
                >
                  <span className="fw-bold">Nombre:</span>
                </label>
                <span id="inputEmail4">
                  {user ? user.name : "Esperando información..."}
                </span>
              </div>
            </div>
            <div className="col-12 col-md-4 mt-3">
              <div className="mb-3">
                <label
                  htmlFor="inputEmail4"
                  className="form-label"
                  style={{ display: "block" }}
                >
                  <span className="fw-bold">Correo:</span>
                </label>
                <span id="inputEmail4">
                  {user ? user.email : "Esperando información..."}
                </span>
              </div>
            </div>
            <div className="col-12 col-md-3 mt-3">
              <div className="mb-3">
                <label
                  htmlFor="inputEmail4"
                  className="form-label"
                  style={{ display: "block" }}
                >
                  <span className="fw-bold">Rol:</span>
                </label>
                <span id="inputEmail4">
                  {user ? user.roles[0].name : "Esperando información..."}
                </span>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
}
