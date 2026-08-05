
// Función que muestra u oculta la información de una promoción
function mostrarPromo(enlace){

    const detalle = enlace
        .closest(".tarjeta-promocion")
        .querySelector(".detalle-promocion");

    detalle.classList.toggle("mostrar");

    enlace.textContent = "Ver más"; 
    enlace.classList.toggle("abierto");
}