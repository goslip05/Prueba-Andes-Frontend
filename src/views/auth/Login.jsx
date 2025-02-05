import { createRef, useState } from 'react';
import { useFunctions } from '../../hooks/useFunctions';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

export default function Login() {

  const { updateTitlePage } = useFunctions();
  
  const [errores, setErrores] = useState([]);

  //actualizar titulo pagina
  updateTitlePage('Login');

  //datos
  const emailRef = createRef();
  const passwordRef = createRef();

  //instanciando
  const { login } = useAuth({ middleware: 'guest', url: '/panel' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const datos = {
        email: emailRef.current.value,
        password: passwordRef.current.value
    }

    login(datos, setErrores)
  }

  return (
    <div className="col-xl-4 col-lg-5 col-md-7 col-12">

        <form id="formulario_login" onSubmit={handleSubmit} method="POST">

          {/*   <div className="login100-form-avatar text-center">
                <img src={logo} alt="AVATAR" />
            </div> */}

            <div className="login100-form-title text-uppercase">
               Prueba Andes
            </div>

            <div className="input_class">
                <div className="form-floating mt-4 mb-3">
                    <input type="email" className="form-control rounded-pill" id="email" name="email" placeholder="name@example.com" ref={emailRef} required />
                    <label>Correo Electronico</label>
                </div>
            </div>

            <div className="input_class">
                <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-pill" id="password" name="password" placeholder="contraseña" ref={passwordRef} required />
                    <label>Contraseña</label>
                </div>
            </div>

            <div className="d-grid gap-2">
                <button className="btn btn-primary rounded-pill" type="submit">Iniciar Sesión</button>
            </div>

            <div className="login100-form-title-2">
                Copyright &copy; -  Prueba - Andes - 2025
            </div>

        </form>

    </div>
  )
}
