import React from 'react'
import ReactDOM from 'react-dom/client'
import { InformacionProvider } from './context/InformacionProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InformacionProvider>
      <RouterProvider router={router} />
    </InformacionProvider>
  </React.StrictMode>,
)
