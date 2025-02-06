
export const handleClickSidebarToggle = ($) => {
    return ocultarMostrarSidebar($)
}

function ocultarMostrarSidebar($) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
}


//funcion para obtener el color de estado 
export const getColorEstadoTask = (estado) => {
    switch (estado) {
        case "pendiente":
            return 'danger';

        case "en progreso":
            return 'warning';

        case "completada":
            return 'success';
        
        default:
            return 'primary';
    }
};
