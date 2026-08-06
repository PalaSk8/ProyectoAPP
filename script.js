
// Función que muestra/oculta la información de las promociones al hacer clic en el enlace "Ver más"
function mostrarPromo(enlace){

    const detalle = enlace
        .closest(".tarjeta-promocion")
        .querySelector(".detalle-promocion");

    detalle.classList.toggle("mostrar");

    enlace.textContent = "Ver más"; 
    enlace.classList.toggle("abierto");
}