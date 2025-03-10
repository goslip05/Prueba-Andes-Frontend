import { createRef, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import logo from "../../assets/images/logo andes.png";
import { Link } from "react-router-dom";

export default function Login() {
  const { updateTitlePage } = useFunctions();

  const [errores, setErrores] = useState([]);

  //actualizar titulo pagina
  updateTitlePage("Login");

  //datos
  const emailRef = createRef();
  const passwordRef = createRef();

  //instanciando
  const { login } = useAuth({ middleware: "guest", url: "/panel" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
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
                Iniciar Sesión
              </button>

              <p className="text-center mb-0">
                No tienes una cuenta?{" "}
                
                <Link
                  to={`/register`}
                  className="text-decoration-non"
                >
                  Registrarme
                </Link>
                
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
