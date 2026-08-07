
// Función que muestra/oculta la información de las promociones al hacer clic en el enlace "Ver más"
function mostrarPromo(enlace){

    const detalle = enlace
        .closest(".tarjeta-promocion")
        .querySelector(".detalle-promocion");

    detalle.classList.toggle("mostrar");

    enlace.textContent = "Ver más"; 
    enlace.classList.toggle("abierto");
}




const switchDark = document.querySelector("#darkMode");
const logo = document.getElementById("logo");

// recuperar modo guardado
if (localStorage.getItem("modo") === "oscuro") {

    document.body.classList.add("dark-mode");
    
    if (switchDark) {
        switchDark.checked = true;
    }
    if (logo) {
        logo.src = "img/logo negro.png";
    }

} else {
    if (logo) {
        logo.src = "img/logo blanco.png";
    }
}


// solo activar cambio si existe el switch
if (switchDark) {

    switchDark.addEventListener("change", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            if (logo) {
                logo.src = "img/logo negro.png";
            }

            localStorage.setItem("modo", "oscuro");

        } else {
            if (logo) {
                logo.src = "img/logo blanco.png";
            }
            localStorage.setItem("modo", "claro");
        }
    });
}