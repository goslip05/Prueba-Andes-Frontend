
import clienteAxios from '../config/axios'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const useAuth = ({middleware, url}) => {

   const MySwal = withReactContent(Swal)
   const token = localStorage.getItem('AUTH_TOKEN')
   const navigate = useNavigate()

   const { data: user, error, mutate } = useSWR(
      token ? '/api/user' : null, // Solo ejecuta la consulta si hay un token
      () =>
        clienteAxios('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.data)
          .catch((error) => {
            throw Error(error?.response?.data?.errors);
          }),
      {
        revalidateOnFocus: token !== null, // Revalidar solo cuando hay un token
      }
   );


    const login = async (datos, setErrores) => {
    try {
      // Mostrar el modal de carga
      MySwal.fire({
        icon: 'info',
        title: '¡Iniciando Sesión!',
        text: 'Validando datos, espere por favor...',
        timerProgressBar: true,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
  
      const response = await clienteAxios.post('/api/login', datos);
  
      // Verificar si hay errores en la respuesta
      if (response.data && response.data.errors && Object.keys(response.data.errors).length > 0) {
        MySwal.fire({
          icon: 'error',
          title: 'Se presentó un error!',
          text: Object.values(response.data.errors).flat().join('\n'),
          confirmButtonColor: '#023d67',
          confirmButtonText: 'Entendido!',
          allowOutsideClick: false,
        });
      } else {
        // Inicio de sesión exitoso
        MySwal.fire({
          icon: 'success',
          text: 'Inicio de Sesión Exitoso, redireccionando...',
          showConfirmButton: false,
          allowOutsideClick: true,
          didOpen: () => {
            MySwal.showLoading();
          },
        });
  
        localStorage.setItem('AUTH_TOKEN', response.data.access_token);
        setErrores([]);
        await mutate();
        window.location.href = '/panel';
      }
    } catch (error) {
      // Finalizar el modal de carga
      MySwal.close();
  
      const responseData = error.response?.data;
  
      if (error.response?.status === 401) {
        // Error de credenciales inválidas
        MySwal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: responseData?.message || 'Las credenciales ingresadas son incorrectas.',
          confirmButtonColor: '#023d67',
          confirmButtonText: 'Entendido!',
          allowOutsideClick: false,
        });
      } else if (responseData?.errors && Object.keys(responseData.errors).length > 0) {
        // Error de validación (asegúrate de que errors exista y tenga al menos una clave)
        MySwal.fire({
          icon: 'error',
          title: 'Se presentó un error!',
          text: Object.values(responseData.errors).flat().join('\n'),
          confirmButtonColor: '#023d67',
          confirmButtonText: 'Entendido!',
          allowOutsideClick: false,
        });
      } else {
        // Otro tipo de error o error desconocido
        console.error('Error desconocido:', error);
        MySwal.fire({
          icon: 'error',
          title: 'Se presentó un error!',
          text: 'Ocurrió un error inesperado, por favor intente de nuevo.',
          confirmButtonColor: '#023d67',
          confirmButtonText: 'Entendido!',
          allowOutsideClick: false,
        });
      }
  
      // Establecer los errores solo si responseData.errors existe
      setErrores(Object.values(responseData?.errors || {}));
    }
    };

    const registro = async (datos, setErrores) => {
      try {
        // Mostrar el modal de carga
        MySwal.fire({
          icon: 'info',
          title: '¡Registrando usuario!',
          text: 'Validando datos, espere por favor...',
          timerProgressBar: true,
          didOpen: () => {
            MySwal.showLoading();
          },
        });
    
        const response = await clienteAxios.post('/api/register', datos);
    
        // Verificar si hay errores en la respuesta
        if (response.data && response.data.errors && Object.keys(response.data.errors).length > 0) {
          MySwal.fire({
            icon: 'error',
            title: 'Se presentó un error!',
            text: Object.values(response.data.errors).flat().join('\n'),
            confirmButtonColor: '#023d67',
            confirmButtonText: 'Entendido!',
            allowOutsideClick: false,
          });
        } else {
          // registro exitoso
          MySwal.fire({
            icon: 'success',
            text: 'Te registraste exitosamente, redireccionando...',
            showConfirmButton: false,
            allowOutsideClick: true,
            didOpen: () => {
              MySwal.showLoading();
            },
          });
          setErrores([]);
          await mutate();
          setTimeout(() => {
            MySwal.close();
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        // Finalizar el modal de carga
        MySwal.close();
    
        const responseData = error.response?.data;
    
        if (error.response?.status === 401) {
          // Error de credenciales inválidas
          MySwal.fire({
            icon: 'error',
            title: 'Credenciales inválidas',
            text: responseData?.message || 'Las credenciales ingresadas son incorrectas.',
            confirmButtonColor: '#023d67',
            confirmButtonText: 'Entendido!',
            allowOutsideClick: false,
          });
        } else if (responseData?.errors && Object.keys(responseData.errors).length > 0) {
          // Error de validación (asegúrate de que errors exista y tenga al menos una clave)
          MySwal.fire({
            icon: 'error',
            title: 'Se presentó un error!',
            text: Object.values(responseData.errors).flat().join('\n'),
            confirmButtonColor: '#023d67',
            confirmButtonText: 'Entendido!',
            allowOutsideClick: false,
          });
        } else {
          // Otro tipo de error o error desconocido
          console.error('Error desconocido:', error);
          MySwal.fire({
            icon: 'error',
            title: 'Se presentó un error!',
            text: 'Ocurrió un error inesperado, por favor intente de nuevo.',
            confirmButtonColor: '#023d67',
            confirmButtonText: 'Entendido!',
            allowOutsideClick: false,
          });
        }
    
        // Establecer los errores solo si responseData.errors existe
        setErrores(Object.values(responseData?.errors || {}));
      }
      };
  
  

   const logout = async () =>{
      try {
         await clienteAxios.post('/api/logout',null, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         localStorage.removeItem('AUTH_TOKEN')
         navigate('/login')
         await mutate(undefined)
      } catch (error) {
         throw Error(error?.response?.data?.errors)
      }
   }

 
   useEffect( () => {
      if (middleware === 'guest' && url && user && token) {
         navigate(url)
      }
      if (middleware === 'auth' && !error && token === null) {
         navigate('/login')
      }
   }, [user, error, token])



   return {
      login,
      logout,
      registro,
      user,
      error
   }
}

