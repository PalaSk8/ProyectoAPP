// Función que muestra/oculta la información de las promociones al hacer clic en el enlace "Ver más"
function mostrarPromo(enlace){
    const detalle = enlace
        .closest(".tarjeta-promocion")
        .querySelector(".detalle-promocion");

    detalle.classList.toggle("mostrar");
    enlace.textContent = "Ver más";
    enlace.classList.toggle("abierto");
}

/* =====================================================
   MODO OSCURO
===================================================== */
const switchDark = document.querySelector("#darkMode");
const logo = document.getElementById("logo");

if (localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("dark-mode");
    if (switchDark) switchDark.checked = true;
    if (logo) logo.src = "img/logo negro.png";
} else {
    if (logo) logo.src = "img/logo blanco.png";
}

if (switchDark) {
    switchDark.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            if (logo) logo.src = "img/logo negro.png";
            localStorage.setItem("modo", "oscuro");
        } else {
            if (logo) logo.src = "img/logo blanco.png";
            localStorage.setItem("modo", "claro");
        }
    });
}

/* =====================================================
   MENÚ HAMBURGUESA
===================================================== */
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
const modalEditar = document.getElementById("modalEditar");
const cerrarModalEditar = document.getElementById("cerrarModalEditar");
const cancelarModalEditar = document.getElementById("cancelarModalEditar");
const guardarModalEditar = document.getElementById("guardarModalEditar");
const tituloModalEditar = document.getElementById("tituloModalEditar");
const etiquetaModalEditar = document.getElementById("etiquetaModalEditar");
const campoModalEditar = document.getElementById("campoModalEditar");
const mensajeModalEditar = document.getElementById("mensajeModalEditar");

const nombreUsuario = document.getElementById("nombreUsuario");
const nombreCompleto = document.getElementById("nombreCompleto");
const correoElectronico = document.getElementById("correoElectronico");
const numeroTelefono = document.getElementById("numeroTelefono");

let tipoEdicionActual = null;

document.querySelectorAll(".boton-editar").forEach(boton => {
    boton.addEventListener("click", () => {
        tipoEdicionActual = boton.dataset.tipo;
        mensajeModalEditar.textContent = "";

        if (tipoEdicionActual === "nombre") {
            tituloModalEditar.textContent = "Editar nombre";
            etiquetaModalEditar.textContent = "Nombre completo";
            campoModalEditar.value = nombreCompleto.textContent.trim();
            campoModalEditar.type = "text";
        }

        if (tipoEdicionActual === "correo") {
            tituloModalEditar.textContent = "Editar correo";
            etiquetaModalEditar.textContent = "Correo electrónico";
            campoModalEditar.value = correoElectronico.textContent.trim();
            campoModalEditar.type = "email";
        }

        if (tipoEdicionActual === "telefono") {
            tituloModalEditar.textContent = "Editar teléfono";
            etiquetaModalEditar.textContent = "Número de teléfono";
            campoModalEditar.value = numeroTelefono.textContent.trim();
            campoModalEditar.type = "tel";
        }

        modalEditar.classList.add("activo");
        setTimeout(() => {
            campoModalEditar.focus();
            campoModalEditar.select();
        }, 100);
    });
});

if (guardarModalEditar) {
    guardarModalEditar.addEventListener("click", () => {
        const nuevoValor = campoModalEditar.value.trim();

        if (nuevoValor === "") {
            mensajeModalEditar.textContent = "Este campo no puede estar vacío.";
            campoModalEditar.focus();
            return;
        }

        if (tipoEdicionActual === "nombre") {
            nombreCompleto.textContent = nuevoValor;
            nombreUsuario.textContent = nuevoValor;
        }
        if (tipoEdicionActual === "correo") {
            correoElectronico.textContent = nuevoValor;
        }
        if (tipoEdicionActual === "telefono") {
            numeroTelefono.textContent = nuevoValor;
        }

        cerrarEditar();
    });
}

function cerrarEditar() {
    modalEditar.classList.remove("activo");
    tipoEdicionActual = null;
    mensajeModalEditar.textContent = "";
}

if (cerrarModalEditar) cerrarModalEditar.addEventListener("click", cerrarEditar);
if (cancelarModalEditar) cancelarModalEditar.addEventListener("click", cerrarEditar);

/* MODAL DE FOTO */
const modalFoto = document.getElementById("modalFoto");
const cerrarModalFoto = document.getElementById("cerrarModalFoto");
const cancelarModalFoto = document.getElementById("cancelarModalFoto");
const guardarModalFoto = document.getElementById("guardarModalFoto");
const botonCamara = document.getElementById("botonCamara");
const selectorFoto = document.getElementById("selectorFoto");
const vistaPreviaFoto = document.getElementById("vistaPreviaFoto");
const imagenAvatar = document.querySelector(".imagen-avatar");

let fotoTemporal = null;

if (botonCamara) {
    botonCamara.addEventListener("click", () => {
        fotoTemporal = null;
        vistaPreviaFoto.src = imagenAvatar.src;
        modalFoto.classList.add("activo");
    });
}

if (selectorFoto) {
    selectorFoto.addEventListener("change", evento => {
        const archivo = evento.target.files[0];
        if (!archivo) return;
        if (!archivo.type.startsWith("image/")) return;
        fotoTemporal = URL.createObjectURL(archivo);
        vistaPreviaFoto.src = fotoTemporal;
    });
}

if (guardarModalFoto) {
    guardarModalFoto.addEventListener("click", () => {
        if (fotoTemporal) imagenAvatar.src = fotoTemporal;
        cerrarFoto();
    });
}

function cerrarFoto() {
    modalFoto.classList.remove("activo");
}

if (cerrarModalFoto) cerrarModalFoto.addEventListener("click", cerrarFoto);
if (cancelarModalFoto) cancelarModalFoto.addEventListener("click", cerrarFoto);

/* MODAL DE IDIOMA */
const modalIdioma = document.getElementById("modalIdioma");
const botonIdioma = document.getElementById("botonIdioma");
const cerrarModalIdioma = document.getElementById("cerrarModalIdioma");
const cancelarModalIdioma = document.getElementById("cancelarModalIdioma");
const guardarModalIdioma = document.getElementById("guardarModalIdioma");

if (botonIdioma) {
    botonIdioma.addEventListener("click", () => {
        modalIdioma.classList.add("activo");
    });
}

function cerrarIdioma() {
    modalIdioma.classList.remove("activo");
}

if (cerrarModalIdioma) cerrarModalIdioma.addEventListener("click", cerrarIdioma);
if (cancelarModalIdioma) cancelarModalIdioma.addEventListener("click", cerrarIdioma);

if (guardarModalIdioma) {
    guardarModalIdioma.addEventListener("click", () => {
        const idiomaSeleccionado = document.querySelector('input[name="idioma"]:checked');
        if (!idiomaSeleccionado) return;
        localStorage.setItem("idioma", idiomaSeleccionado.value);
        cerrarIdioma();
    });
}

/* CERRAR MODALES AL HACER CLICK FUERA */
document.querySelectorAll(".fondo-modal").forEach(fondo => {
    fondo.addEventListener("click", evento => {
        if (evento.target === fondo) fondo.classList.remove("activo");
    });
});

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        document.querySelectorAll(".fondo-modal.activo").forEach(modal => {
            modal.classList.remove("activo");
        });
    }
});

/* MOSTRAR/OCULTAR CONTRASEÑA */
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

const formCambiarContrasena = document.getElementById("formCambiarContrasena");
if (formCambiarContrasena) {
    formCambiarContrasena.addEventListener("submit", function(e) {
        e.preventDefault();
        const nueva = document.getElementById("nuevaContrasena").value;
        const confirmar = document.getElementById("confirmarContrasena").value;
        if (nueva !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        alert("Contraseña cambiada correctamente.");
    });
}

/* =====================================================
   FLUJO DE COMPRA - PASO 1 (comprasr.html)
===================================================== */
const destinosDisponibles = [
    "Ciudad de México", "Toluca", "Puebla", "Querétaro",
    "Morelia", "Guadalajara", "Pachuca", "Cuernavaca",
    "Acapulco", "León"
];

function llenarListaDestinos(ul) {
    ul.innerHTML = "";
    destinosDisponibles.forEach(ciudad => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-location-dot"></i>${ciudad}`;
        li.addEventListener('click', () => {
            const btn = ul.previousElementSibling.querySelector('span');
            btn.textContent = ciudad;
            ul.classList.remove('visible');
        });
        ul.appendChild(li);
    });
}

const listaOrigen = document.getElementById('listaOrigen');
const listaDestino = document.getElementById('listaDestino');
const btnOrigenEl = document.getElementById('btnOrigen');
const btnDestinoEl = document.getElementById('btnDestino');

if (btnOrigenEl && btnDestinoEl && listaOrigen && listaDestino) {
    llenarListaDestinos(listaOrigen);
    llenarListaDestinos(listaDestino);

    btnOrigenEl.addEventListener('click', (e) => {
        e.stopPropagation();
        listaDestino.classList.remove('visible');
        listaOrigen.classList.toggle('visible');
    });

    btnDestinoEl.addEventListener('click', (e) => {
        e.stopPropagation();
        listaOrigen.classList.remove('visible');
        listaDestino.classList.toggle('visible');
    });
}

function generarFechasDisponibles(dias = 7) {
    const fechas = [];
    const hoy = new Date();
    for (let i = 0; i < dias; i++) {
        const f = new Date(hoy);
        f.setDate(hoy.getDate() + i);
        fechas.push(f.toLocaleDateString('es-MX', { weekday: 'short', day: '2-digit', month: 'short' }));
    }
    return fechas;
}

function llenarListaFechas(ul, btn) {
    ul.innerHTML = "";
    generarFechasDisponibles().forEach(fecha => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-regular fa-calendar"></i>${fecha}`;
        li.addEventListener('click', () => {
            btn.querySelector('.fecha-texto').textContent = fecha;
            btn.classList.add('seleccionada');
            ul.classList.remove('visible');
        });
        ul.appendChild(li);
    });
}

const fechaSalidaBtn = document.getElementById('fechaSalida');
const fechaRegresoBtn = document.getElementById('fechaRegreso');
const listaFechaSalida = document.getElementById('listaFechaSalida');
const listaFechaRegreso = document.getElementById('listaFechaRegreso');

if (fechaSalidaBtn && fechaRegresoBtn && listaFechaSalida && listaFechaRegreso) {
    llenarListaFechas(listaFechaSalida, fechaSalidaBtn);
    llenarListaFechas(listaFechaRegreso, fechaRegresoBtn);

    fechaSalidaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        listaFechaRegreso.classList.remove('visible');
        listaFechaSalida.classList.toggle('visible');
    });

    fechaRegresoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        listaFechaSalida.classList.remove('visible');
        listaFechaRegreso.classList.toggle('visible');
    });
}

document.addEventListener('click', () => {
    document.querySelectorAll('.lista-destinos, .lista-fechas').forEach(ul => {
        ul.classList.remove('visible');
    });
});

document.querySelectorAll('.contador').forEach(contador => {
    const min = parseInt(contador.dataset.min);
    const max = parseInt(contador.dataset.max);
    const valorSpan = contador.querySelector('.contador-valor');
    const btnMenos = contador.querySelector('.menos');
    const btnMas = contador.querySelector('.mas');

    btnMas.addEventListener('click', () => {
        let valor = parseInt(valorSpan.textContent);
        if (valor < max) valorSpan.textContent = valor + 1;
    });

    btnMenos.addEventListener('click', () => {
        let valor = parseInt(valorSpan.textContent);
        if (valor > min) valorSpan.textContent = valor - 1;
    });
});

const btnSwap = document.getElementById('btnSwap');
if (btnSwap) {
    btnSwap.addEventListener('click', () => {
        const origenSpan = document.querySelector('#btnOrigen span');
        const destinoSpan = document.querySelector('#btnDestino span');
        const temp = origenSpan.textContent;
        origenSpan.textContent = destinoSpan.textContent;
        destinoSpan.textContent = temp;
    });
}

const btnBuscarBoletos = document.getElementById('btnBuscarBoletos');
if (btnBuscarBoletos) {
    btnBuscarBoletos.addEventListener('click', () => {
        const origen = document.querySelector('#btnOrigen span')?.textContent || "";
        const destino = document.querySelector('#btnDestino span')?.textContent || "";
        const fechaSalida = document.querySelector('#fechaSalida .fecha-texto')?.textContent || "";
        const adultos = document.querySelectorAll('.contador')[0]?.querySelector('.contador-valor')?.textContent || "1";
        const ninos = document.querySelectorAll('.contador')[1]?.querySelector('.contador-valor')?.textContent || "0";
        const inapam = document.querySelectorAll('.contador')[2]?.querySelector('.contador-valor')?.textContent || "0";

        const totalPasajeros = parseInt(adultos) + parseInt(ninos) + parseInt(inapam);

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.origen = origen;
        compra.destino = destino;
        compra.fechaSalida = fechaSalida;
        compra.totalPasajeros = totalPasajeros;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compras2.html';
    });
}

/* =====================================================
   FLUJO DE COMPRA - PASO 2 (compras2.html)
===================================================== */
const resumenSalida = document.getElementById('resumenSalida');
const listaHorasResumen = document.getElementById('listaHorasResumen');
const horaSalidaTexto = document.getElementById('horaSalidaTexto');

if (resumenSalida && listaHorasResumen && horaSalidaTexto) {
    const horarios = ["07:00 AM", "09:30 AM", "10:00 AM", "12:00 PM", "03:15 PM", "06:45 PM"];

    listaHorasResumen.innerHTML = "";
    horarios.forEach(hora => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-regular fa-clock"></i>${hora}`;
        li.addEventListener('click', () => {
            horaSalidaTexto.textContent = hora;
            listaHorasResumen.classList.remove('visible');
        });
        listaHorasResumen.appendChild(li);
    });

    resumenSalida.addEventListener('click', (e) => {
        e.stopPropagation();
        listaHorasResumen.classList.toggle('visible');
    });

    document.addEventListener('click', () => {
        listaHorasResumen.classList.remove('visible');
    });
}

const btnContinuar = document.getElementById('btnContinuar');
if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
        const nombre = document.getElementById('nombrePasajero').value.trim();
        const correo = document.getElementById('correoPasajero').value.trim();
        const horaSeleccionada = horaSalidaTexto ? horaSalidaTexto.textContent : "";

        if (!nombre || !correo) {
            alert("Por favor completa tu nombre y correo.");
            return;
        }

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.horaSalida = horaSeleccionada;
        compra.nombrePasajero = nombre;
        compra.correoPasajero = correo;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compras3.html';
    });
}

/* =====================================================
   FLUJO DE COMPRA - PASO 3 (compras3.html)
===================================================== */
const btnPagar = document.getElementById('btnPagar');
const btnCancelar = document.getElementById('btnCancelar');

if (btnPagar) {
    btnPagar.addEventListener('click', () => {
        const nombre = document.getElementById('nombreComprador').value.trim();
        const telefono = document.getElementById('telefonoComprador').value.trim();
        const correo = document.getElementById('correoComprador').value.trim();
        const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim();
        const fechaExp = document.getElementById('fechaExpiracion').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const titular = document.getElementById('titularTarjeta').value.trim();

        if (!nombre || !telefono || !correo || !numeroTarjeta || !fechaExp || !cvv || !titular) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.nombreComprador = nombre;
        compra.correoComprador = correo;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compras4.html';
    });
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        window.location.href = 'compras2.html';
    });
}

/* =====================================================
   FLUJO DE COMPRA - PASO 4 (compras4.html)
===================================================== */
const detalleCompraEl = document.getElementById('detalleNombrePasajero');

if (detalleCompraEl) {
    const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};

    document.getElementById('rutaOrigen').textContent = compra.origen || "Origen";
    document.getElementById('rutaDestino').textContent = compra.destino || "Destino";
    document.getElementById('detalleFecha').textContent = compra.fechaSalida || "--/--/----";
    document.getElementById('detalleHora').textContent = compra.horaSalida || "-- : --";
    document.getElementById('detalleTotalPasajeros').textContent = compra.totalPasajeros || "1";
    document.getElementById('detalleNombrePasajero').textContent = compra.nombrePasajero || "Nombre del pasajero";

    const datosQR = `Flecha Roja | ${compra.origen || ""} - ${compra.destino || ""} | ${compra.fechaSalida || ""} ${compra.horaSalida || ""} | Pasajero: ${compra.nombrePasajero || ""}`;
    const qrImg = document.getElementById('qrBoleto');
    if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(datosQR)}`;
    }

    const btnDescargar = document.getElementById('btnDescargarBoleto');
    if (btnDescargar) {
        btnDescargar.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = qrImg.src;
            link.download = 'boleto-flecha-roja.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const btnVolverInicio = document.getElementById('btnVolverInicio');
    if (btnVolverInicio) {
        btnVolverInicio.addEventListener('click', () => {
            localStorage.removeItem('flechaRojaCompra');
            window.location.href = 'comprasr.html';
        });
    }
}

/* =====================================================
   STEPPER (posición del camión) - las 4 páginas
===================================================== */
function actualizarStepper() {
    const stepperEl = document.querySelector('.stepper');
    const bus = document.getElementById('stepperBus');
    if (!stepperEl || !bus) return;

    const pasoActual = stepperEl.dataset.pasoActual || "1";
    const dotActivo = stepperEl.querySelector(`.stepper-punto[data-paso="${pasoActual}"]`);
    if (!dotActivo) return;

    const stepperRect = stepperEl.getBoundingClientRect();
    const dotRect = dotActivo.getBoundingClientRect();
    const centerX = dotRect.left + dotRect.width / 2 - stepperRect.left;
    bus.style.left = `${centerX}px`;
}

function irAPaso(numeroPaso) {
    document.querySelectorAll('.stepper-punto').forEach(punto => {
        punto.classList.toggle('activo', parseInt(punto.dataset.paso) === numeroPaso);
    });
    document.querySelector('.stepper').dataset.pasoActual = numeroPaso;
    actualizarStepper();
}

window.addEventListener('load', actualizarStepper);
window.addEventListener('resize', actualizarStepper);

/* Saludo con nombre (usuario registrado) */
const nombreSaludoEl = document.getElementById('nombreSaludo');
if (nombreSaludoEl) {
    // TODO: cuando exista login real, reemplazar esto por:
    // const nombreUsuarioActivo = localStorage.getItem('usuarioNombre') || "Usuario";
    const nombreUsuarioActivo = "Pedro"; // valor simulado
    nombreSaludoEl.textContent = nombreUsuarioActivo;
}

/* Botón Buscar Boletos - flujo usuario registrado (compra1.html) */
const btnBuscarBoletosUser = document.getElementById('btnBuscarBoletosUser');
if (btnBuscarBoletosUser) {
    btnBuscarBoletosUser.addEventListener('click', () => {
        const origen = document.querySelector('#btnOrigen span')?.textContent || "";
        const destino = document.querySelector('#btnDestino span')?.textContent || "";
        const fechaSalida = document.querySelector('#fechaSalida .fecha-texto')?.textContent || "";
        const adultos = document.querySelectorAll('.contador')[0]?.querySelector('.contador-valor')?.textContent || "1";
        const ninos = document.querySelectorAll('.contador')[1]?.querySelector('.contador-valor')?.textContent || "0";
        const inapam = document.querySelectorAll('.contador')[2]?.querySelector('.contador-valor')?.textContent || "0";

        const totalPasajeros = parseInt(adultos) + parseInt(ninos) + parseInt(inapam);

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.origen = origen;
        compra.destino = destino;
        compra.fechaSalida = fechaSalida;
        compra.totalPasajeros = totalPasajeros;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compra2.html';
    });
}
/* =====================================================
   PASO 2 USUARIO REGISTRADO (compra2.html) - Chips de pasajeros
===================================================== */
const pasajerosChipsEl = document.getElementById('pasajerosChips');
const chipAgregarPasajero = document.getElementById('chipAgregarPasajero');

if (pasajerosChipsEl && chipAgregarPasajero) {

    // TODO: cuando exista la sección "Mis pasajeros" real, reemplazar esto por:
    // const misPasajeros = JSON.parse(localStorage.getItem('misPasajeros')) || [];
    const misPasajeros = [
        { nombre: "José Méndez" },
        { nombre: "Luz Méndez" }
    ]; // datos simulados por ahora

    let pasajeroSeleccionado = null;

    function iniciales(nombre) {
        return nombre.split(" ").map(p => p[0]).join("").substring(0, 2).toUpperCase();
    }

    misPasajeros.forEach(pasajero => {
        const chip = document.createElement('div');
        chip.className = 'pasajero-chip';
        chip.innerHTML = `<span class="chip-avatar">${iniciales(pasajero.nombre)}</span>${pasajero.nombre}`;

        chip.addEventListener('click', () => {
            document.querySelectorAll('.pasajero-chip').forEach(c => c.classList.remove('seleccionado'));
            chip.classList.add('seleccionado');
            pasajeroSeleccionado = pasajero.nombre;
        });

        // insertamos cada chip ANTES del botón "Agregar", que siempre queda al final
        pasajerosChipsEl.insertBefore(chip, chipAgregarPasajero);
    });

    // Si no hay pasajeros guardados, el chip "Agregar" ya queda visible solo
    // (no hace falta lógica extra: el <a href="mispasajeros.html"> ya redirige siempre)

    window.obtenerPasajeroSeleccionado = () => pasajeroSeleccionado;
}

/* Botón Continuar (compra2.html) */
const btnContinuarUser = document.getElementById('btnContinuarUser');
if (btnContinuarUser) {
    btnContinuarUser.addEventListener('click', () => {
        const horaSeleccionada = horaSalidaTexto ? horaSalidaTexto.textContent : "";
        const nombrePasajero = window.obtenerPasajeroSeleccionado ? window.obtenerPasajeroSeleccionado() : null;

        if (!nombrePasajero) {
            alert("Por favor selecciona un pasajero o agrega uno nuevo.");
            return;
        }

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.horaSalida = horaSeleccionada;
        compra.nombrePasajero = nombrePasajero;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compra3.html';
    });
}
/* =====================================================
   PASO 3 USUARIO REGISTRADO (compra3.html)
===================================================== */
const metodosPagoUser = document.querySelectorAll('.metodo-card');
const camposTarjeta = document.getElementById('camposTarjeta');
const cajaPuntos = document.getElementById('cajaPuntos');

if (metodosPagoUser.length > 0 && camposTarjeta && cajaPuntos) {

    function actualizarVistaMetodo(metodo) {
        if (metodo === 'flechamigo') {
            camposTarjeta.style.display = 'none';
            cajaPuntos.style.display = 'block';
        } else {
            camposTarjeta.style.display = 'block';
            cajaPuntos.style.display = 'none';
        }
    }

    metodosPagoUser.forEach(card => {
        card.addEventListener('click', () => {
            metodosPagoUser.forEach(c => c.classList.remove('activa'));
            card.classList.add('activa');
            actualizarVistaMetodo(card.dataset.metodo);
        });
    });

    // Estado inicial: el que ya tenga la clase "activa" en el HTML
    const metodoInicial = document.querySelector('.metodo-card.activa');
    if (metodoInicial) {
        actualizarVistaMetodo(metodoInicial.dataset.metodo);
    }
}

// Link "Ir a Mis Puntos" dentro de la caja de puntos
const linkIrPuntos = document.getElementById('linkIrPuntos');
if (linkIrPuntos) {
    linkIrPuntos.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'misPuntos.html';
    });
}

/* Botón Pagar (compra3.html) */
const btnPagarUser = document.getElementById('btnPagarUser');
const btnCancelarUser = document.getElementById('btnCancelarUser');

if (btnPagarUser) {
    btnPagarUser.addEventListener('click', () => {
        const nombre = document.getElementById('nombreComprador').value.trim();
        const telefono = document.getElementById('telefonoComprador').value.trim();
        const correo = document.getElementById('correoComprador').value.trim();
        const metodoActivo = document.querySelector('.metodo-card.activa')?.dataset.metodo || "tarjeta";

        if (!nombre || !telefono || !correo) {
            alert("Por favor completa tus datos.");
            return;
        }

        if (metodoActivo === 'tarjeta') {
            const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim();
            const fechaExp = document.getElementById('fechaExpiracion').value.trim();
            const cvv = document.getElementById('cvv').value.trim();
            const titular = document.getElementById('titularTarjeta').value.trim();

            if (!numeroTarjeta || !fechaExp || !cvv || !titular) {
                alert("Por favor completa los datos de tu tarjeta.");
                return;
            }
        }

        const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};
        compra.nombreComprador = nombre;
        compra.correoComprador = correo;
        compra.metodoPago = metodoActivo;
        localStorage.setItem('flechaRojaCompra', JSON.stringify(compra));

        window.location.href = 'compra4.html';
    });
}

if (btnCancelarUser) {
    btnCancelarUser.addEventListener('click', () => {
        window.location.href = 'compra2.html';
    });
}

const btnVolverInicio = document.getElementById('btnVolverInicio');
if (btnVolverInicio) {
    btnVolverInicio.addEventListener('click', () => {
        localStorage.removeItem('flechaRojaCompra');
        window.location.href = 'compra.html';
    });
}