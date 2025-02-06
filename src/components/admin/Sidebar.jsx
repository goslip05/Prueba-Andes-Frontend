import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";



// Icons
import { FaTachometerAlt, FaFolder, FaUsers, FaList, FaWarehouse } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import $ from "jquery"

import logo from '../../assets/images/code.png';
import { handleClickSidebarToggle } from "../../helpers";
import { AiFillProduct } from "react-icons/ai";

export default function Sidebar({ user }) {

  const location = useLocation();
  const [openMenu, setOpenMenu] = useState('');

  useEffect(() => {
    // Determine which menu to open based on the current path
    if (location.pathname.startsWith('/fucdp')) {
      setOpenMenu('fucdp');
    } else if (location.pathname.startsWith('/configuracion')) {
      setOpenMenu('configuracion');
    } else {
      setOpenMenu('');
    }
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  return (
    <>
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* Logo */}
      <Link to={'/panel'} className="sidebar-brand align-items-center justify-content-center">
        <img src={logo} className="img-fluid" width="80%" alt="Abbott Logo" />
        <div className="sidebar-brand-text pt-3">TAREAS ANDES</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className={`nav-item ${location.pathname === '/panel' ? 'active' : ''}`}>
        <Link to={'/panel'} className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <FaTachometerAlt style={{ marginRight: '8px', fontSize: '20px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8f9fc' }}>Inicio</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />

      <hr className="sidebar-divider my-0" />

      <li className={`nav-item ${location.pathname === '/panel/perfil' ? 'active' : ''}`}>
        <Link to={'/panel/perfil'} className="nav-link">
          <FaWarehouse style={{ marginRight: '8px', fontSize: '20px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8f9fc' }}>Perfil</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />

      <li className={`nav-item ${location.pathname === '/panel/tareas' ? 'active' : ''}`}>
        <Link to={'/panel/tareas'} className="nav-link">
          <FaUsers style={{ marginRight: '8px', fontSize: '20px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8f9fc' }}>Tareas</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => handleClickSidebarToggle($)}
        ></button>
      </div>
      </ul>

    </>
  );
}
