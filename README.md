
# <img src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png" alt="react Logo" width="50" height="50"/> ANDES SCD - API

## Diego Alexander Jimenez -Consumo API- React-JWT

## Prueba realizada del 04/02/2025 al 06/02/2025

Bienvenido. Esta es la prueba técnica para validar mis conocimientos y fortalezas en el mundo del Fronted utilizando React, demostrando así mi capacidad de generar consumo api, estructuración del proyecto, clean code, y demás para el mundo de ANDES SCD.

### Implementaciones:

- **Estructura de Carpetas:**
  - **`api/`**: Contiene las peticiones del CRUD de tareas. (`task.js`).
  - **`assets/`**: Contiene carpetas de estilos y imagenes usuadas en la app.
  - **`components/admin`**: Contiene los componentes utilizados dentro del panel de la app (`Footer.jsx`, `Sidebar.jsx`,`Topbar.jsx`).
  - **`config/`**: Contiene la configuración de axios (`axios.js`).
  - **`context/`**: Contiene el context y el provider de la app (`InformacionProvider.jsx`).
  - **`helpers/`**: Contiene un archivo con metodos para el sidebar y colores en los estados de las tareas. (`index.js`).
  - **`layouts/`**: Contiene los layouts para la uatenticación, el layout principal para el panel. (`AuthLayout.jsx`,`Layout.jsx`,`RegisterLayout.jsx`).
  - **`hooks/`**: Contiene archivos de Javascript con la implementacion de la autenticación, el manejo de titulo de las paginas y informacion context . (`useAuth.js`,`useFunctions.js`,`useInformacion.js`).
  - **`router/`**: Contiene el archivo de enrutamiento para la aplicación (`router.jsx`).
  - **`views/`**: Contiene las vistas relacionadas a los layouts y componentes para mostrar al usuario la información.
    - **`views/admin`**: Contiene las vista inicial que se muestra al usuario (`Inicio.jsx`).
    - **`views/admin/task`**: Contiene las vista para el moódulo de tareas (`AddTask.jsx`,`EditTask.jsx`,`ListTask.jsx`).
     - **`views/auth`**: Contiene las vista para la autenticación y sus estilos (`Login.jsx`,`Register.jsx`,`Login.css`).


- **Diseño y Funcionalidades:**
  - **Diseño**: vistas con buena experiencia de usuario para una mejor presentación visual.
  - **Paginación**: Modificado para mostrar 5 elementos por página.
  - **Paginas**: Implementación de paginas para crear, editar y lsitado de tareas.


## INSTRUCCIONES

- Se consume la api creada en Laravel 9 :
      https://github.com/goslip05/Prueba-Andes-Backend.git
    


## Instalación:

1.Descarga e instala la API de laravel, las instrucciones están dentro del archivo README.md del repositorio.

2.Clonar o descargar este proyecto

3.Acceder mediante terminal a la carpeta del proyecto

4.Instalar las dependencias utilizadas:  npm install

5.Ejecutar el servidor npm start

6.Ver en el navegador el proyecto, por lo general la url es: http://localhost:3000/ 


1. **Descarga e instala la API de laravel**: las instrucciones están dentro del archivo README.md del repositorio.

2. **Clonar o descargar el proyecto**:
    - Clona el repositorio utilizando Git:
      ```bash
      git clone <URL-del-repositorio>
      ```
    - O descarga el proyecto como un archivo ZIP y extráelo en el directorio de tu servidor web.

3. **Acceder mediante terminal a la carpeta del proyecto**:
    - Navega hasta la carpeta raíz del proyecto:
      ```bash
      cd <nombre-del-proyecto>
      ```

4. **Instalar dependencias**:
    - Ejecuta el siguiente comando para instalar las dependencias del proyecto:
      ```bash
      npm install
      ```

5. **Configurar el archivo de entorno**:
    - Copia el archivo de entorno de ejemplo y renómbralo a `.env`:
      ```bash
      cp .env.example .env
      ```

6. **Limpiar cache del servidor**:
    - Limpiar el cache del aplicativo:
      ```bash
      npm cache clear --force
      ```

7. **Levantar el servidor**:
    - Inicia el servidor de desarrollo de react con:
      ```bash
      npm run dev
      ```


## HERRAMIENTAS DE DESARROLLO UTILIZADAS
* React library v18.3.1
* node v20.11.1 
* Visual Studio Code
* Git
* GitHub
* https://primereact.org/
* React Developer Tools

