import Login from "../views/auth/Login";

export default function AuthLayout() {

  return (
    <section className="fondo">
      <div className="container" id="container_login">
          <div className="row vh-100 justify-content-center align-items-center">
              <Login />
          </div>
      </div>
    </section>
  )
}
