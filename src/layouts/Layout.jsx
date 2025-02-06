import { Outlet } from "react-router-dom";
import Footer from "../components/admin/Footer";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { useAuth } from "../hooks/useAuth";

// CSS
import "../assets/css/sb-admin-2.css"
import "../assets/css/base.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';

export default function Layout() {

  const { logout, user } = useAuth({ middleware: 'auth' });
  
  // console.log(user);
  
  return (
    <>
      <div id="wrapper">
        <Sidebar user={user} />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar user={user} logout={logout} />

            <div className="container-fluid">
              <Outlet user={user} />
            </div>
          </div>

          <Footer />
        </div>

      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  )
}
