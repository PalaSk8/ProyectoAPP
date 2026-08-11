
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



// ==========================
// Menú hamburguesa
// ==========================

const btnMenu = document.getElementById("btnMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

if (btnMenu && sideMenu && overlay) {

    btnMenu.addEventListener("click", function (e) {
        e.preventDefault();

        sideMenu.classList.toggle("open");
        overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", function () {
        sideMenu.classList.remove("open");
        overlay.classList.remove("show");
    });

}


/* =====================================================
   MODALES DE MI PERFIL
===================================================== */


/* =====================================================
   ELEMENTOS DEL MODAL DE EDICIÓN
===================================================== */

const modalEditar = document.getElementById("modalEditar");

const cerrarModalEditar =
    document.getElementById("cerrarModalEditar");

const cancelarModalEditar =
    document.getElementById("cancelarModalEditar");

const guardarModalEditar =
    document.getElementById("guardarModalEditar");

const tituloModalEditar =
    document.getElementById("tituloModalEditar");

const etiquetaModalEditar =
    document.getElementById("etiquetaModalEditar");

const campoModalEditar =
    document.getElementById("campoModalEditar");

const mensajeModalEditar =
    document.getElementById("mensajeModalEditar");


/* Elementos del perfil */

const nombreUsuario =
    document.getElementById("nombreUsuario");

const nombreCompleto =
    document.getElementById("nombreCompleto");

const correoElectronico =
    document.getElementById("correoElectronico");

const numeroTelefono =
    document.getElementById("numeroTelefono");


/* Variable para saber qué estamos editando */

let tipoEdicionActual = null;


/* =====================================================
   ABRIR MODAL DE EDICIÓN
===================================================== */

document.querySelectorAll(".boton-editar").forEach(
    boton => {

        boton.addEventListener("click", () => {

            tipoEdicionActual =
                boton.dataset.tipo;


            mensajeModalEditar.textContent = "";


            /* Nombre */

            if (tipoEdicionActual === "nombre") {

                tituloModalEditar.textContent =
                    "Editar nombre";

                etiquetaModalEditar.textContent =
                    "Nombre completo";

                campoModalEditar.value =
                    nombreCompleto.textContent.trim();

                campoModalEditar.type =
                    "text";
            }


            /* Correo */

            if (tipoEdicionActual === "correo") {

                tituloModalEditar.textContent =
                    "Editar correo";

                etiquetaModalEditar.textContent =
                    "Correo electrónico";

                campoModalEditar.value =
                    correoElectronico.textContent.trim();

                campoModalEditar.type =
                    "email";
            }


            /* Teléfono */

            if (tipoEdicionActual === "telefono") {

                tituloModalEditar.textContent =
                    "Editar teléfono";

                etiquetaModalEditar.textContent =
                    "Número de teléfono";

                campoModalEditar.value =
                    numeroTelefono.textContent.trim();

                campoModalEditar.type =
                    "tel";
            }


            modalEditar.classList.add("activo");

            setTimeout(() => {

                campoModalEditar.focus();

                campoModalEditar.select();

            }, 100);

        });

    }
);


/* =====================================================
   GUARDAR INFORMACIÓN
===================================================== */

guardarModalEditar.addEventListener(
    "click",
    () => {

        const nuevoValor =
            campoModalEditar.value.trim();


        /* Validación */

        if (nuevoValor === "") {

            mensajeModalEditar.textContent =
                "Este campo no puede estar vacío.";

            campoModalEditar.focus();

            return;
        }


        /* NOMBRE */

        if (tipoEdicionActual === "nombre") {

            nombreCompleto.textContent =
                nuevoValor;

            nombreUsuario.textContent =
                nuevoValor;
        }


        /* CORREO */

        if (tipoEdicionActual === "correo") {

            correoElectronico.textContent =
                nuevoValor;
        }


        /* TELÉFONO */

        if (tipoEdicionActual === "telefono") {

            numeroTelefono.textContent =
                nuevoValor;
        }


        cerrarEditar();

    }
);


/* =====================================================
   CERRAR MODAL EDITAR
===================================================== */

function cerrarEditar() {

    modalEditar.classList.remove("activo");

    tipoEdicionActual = null;

    mensajeModalEditar.textContent = "";

}


/* Botón X */

cerrarModalEditar.addEventListener(
    "click",
    cerrarEditar
);


/* Botón cancelar */

cancelarModalEditar.addEventListener(
    "click",
    cerrarEditar
);


/* =====================================================
   MODAL DE FOTO
===================================================== */

const modalFoto =
    document.getElementById("modalFoto");

const cerrarModalFoto =
    document.getElementById("cerrarModalFoto");

const cancelarModalFoto =
    document.getElementById("cancelarModalFoto");

const guardarModalFoto =
    document.getElementById("guardarModalFoto");

const botonCamara =
    document.getElementById("botonCamara");

const selectorFoto =
    document.getElementById("selectorFoto");

const vistaPreviaFoto =
    document.getElementById("vistaPreviaFoto");

const imagenAvatar =
    document.querySelector(".imagen-avatar");


/* Foto temporal */

let fotoTemporal = null;


/* Abrir modal */

botonCamara.addEventListener(
    "click",
    () => {

        fotoTemporal = null;

        vistaPreviaFoto.src =
            imagenAvatar.src;

        modalFoto.classList.add("activo");

    }
);


/* Seleccionar imagen */

selectorFoto.addEventListener(
    "change",
    evento => {

        const archivo =
            evento.target.files[0];


        if (!archivo) {
            return;
        }


        if (!archivo.type.startsWith("image/")) {
            return;
        }


        fotoTemporal =
            URL.createObjectURL(archivo);


        vistaPreviaFoto.src =
            fotoTemporal;

    }
);


/* Guardar foto */

guardarModalFoto.addEventListener(
    "click",
    () => {

        if (fotoTemporal) {

            imagenAvatar.src =
                fotoTemporal;

        }


        cerrarFoto();

    }
);


/* Cerrar */

function cerrarFoto() {

    modalFoto.classList.remove("activo");

}


cerrarModalFoto.addEventListener(
    "click",
    cerrarFoto
);


cancelarModalFoto.addEventListener(
    "click",
    cerrarFoto
);


/* =====================================================
   MODAL DE IDIOMA
===================================================== */

const modalIdioma =
    document.getElementById("modalIdioma");

const botonIdioma =
    document.getElementById("botonIdioma");

const cerrarModalIdioma =
    document.getElementById("cerrarModalIdioma");

const cancelarModalIdioma =
    document.getElementById("cancelarModalIdioma");

const guardarModalIdioma =
    document.getElementById("guardarModalIdioma");


/* Abrir */

botonIdioma.addEventListener(
    "click",
    () => {

        modalIdioma.classList.add("activo");

    }
);


/* Cerrar */

function cerrarIdioma() {

    modalIdioma.classList.remove("activo");

}


cerrarModalIdioma.addEventListener(
    "click",
    cerrarIdioma
);


cancelarModalIdioma.addEventListener(
    "click",
    cerrarIdioma
);


/* =====================================================
   GUARDAR IDIOMA
===================================================== */

guardarModalIdioma.addEventListener(
    "click",
    () => {

        const idiomaSeleccionado =
            document.querySelector(
                'input[name="idioma"]:checked'
            );


        if (!idiomaSeleccionado) {
            return;
        }


        const idioma =
            idiomaSeleccionado.value;


        localStorage.setItem(
            "idioma",
            idioma
        );


        cerrarIdioma();


        /*
         * Aquí posteriormente podemos
         * conectar el sistema de traducción
         * de toda la aplicación.
         */

    }
);


/* =====================================================
   CERRAR MODALES AL HACER CLICK FUERA
===================================================== */

document.querySelectorAll(".fondo-modal")
    .forEach(fondo => {

        fondo.addEventListener(
            "click",
            evento => {

                if (evento.target === fondo) {

                    fondo.classList.remove(
                        "activo"
                    );

                }

            }
        );

    });


/* =====================================================
   ESCAPE PARA CERRAR MODALES
===================================================== */

document.addEventListener(
    "keydown",
    evento => {

        if (evento.key === "Escape") {

            document
                .querySelectorAll(".fondo-modal.activo")
                .forEach(modal => {

                    modal.classList.remove(
                        "activo"
                    );

                });

        }

    }
);


function mostrarPassword(id, icono) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

        icono.classList.remove("fa-eye");
        icono.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icono.classList.remove("fa-eye-slash");
        icono.classList.add("fa-eye");
    }
}


document.getElementById("formCambiarContrasena")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const nueva = document.getElementById("nuevaContrasena").value;
    const confirmar = document.getElementById("confirmarContrasena").value;

    if (nueva !== confirmar) {

        alert("Las contraseñas no coinciden.");

        return;
    }

    alert("Contraseña cambiada correctamente.");

});