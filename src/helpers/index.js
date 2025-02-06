
export const handleClickSidebarToggle = ($) => {
    return ocultarMostrarSidebar($)
}

function ocultarMostrarSidebar($) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
}

