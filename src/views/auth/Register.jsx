import { createRef, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import logo from "../../assets/images/logo andes.png";
import { Link } from "react-router-dom";

export default function Register() {
  const { updateTitlePage } = useFunctions();

  const [errores, setErrores] = useState([]);

  //actualizar titulo pagina
  updateTitlePage("Registro");

  //datos
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  //instanciando
  const { registro } = useAuth({ middleware: "guest", url: "/panel" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    registro(datos, setErrores);
  };

  return (
    <div className="container-fluid">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light p-4 p-sm-5 mx-3 my-4 rounded">
            <div className="align-items-center justify-content-center mb-3">
              <div className="login100-form-avatar text-center">
                <img src={logo} alt="logo andes" />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control `}
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  ref={nameRef}
                  required
                />
                <label htmlFor="name">Nombre</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control`}
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  ref={emailRef}
                  required
                />
                <label htmlFor="email">Correo Electronico</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className={`form-control `}
                  id="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-3 mb-4">
                Registrarme
              </button>

              <p className="text-center mb-0">
                Ya tienes una cuenta?{" "}
                <Link to={`/login`} className="text-decoration-non">
                  Iniciar sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
