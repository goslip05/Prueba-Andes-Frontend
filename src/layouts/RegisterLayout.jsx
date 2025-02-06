import Register from "../views/auth/Register";

export default function RegisterLayout() {

  return (
    <section className="fondo">
      <div className="container" id="container_login">
          <div className="row vh-100 justify-content-center align-items-center">
              <Register />
          </div>
      </div>
    </section>
  )
}
