
// Función que muestra/oculta la información de las promociones al hacer clic en el enlace "Ver más"
function mostrarPromo(enlace){

    const detalle = enlace
        .closest(".tarjeta-promocion")
        .querySelector(".detalle-promocion");

    detalle.classList.toggle("mostrar");

    enlace.textContent = "Ver más"; 
    enlace.classList.toggle("abierto");
}
// --- Datos de destinos (random / ejemplo) ---
const destinosDisponibles = [
    "Ciudad de México",
    "Toluca",
    "Puebla",
    "Querétaro",
    "Morelia",
    "Guadalajara",
    "Pachuca",
    "Cuernavaca",
    "Acapulco",
    "León"
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

// --- Fechas disponibles (ejemplo: próximos 7 días) ---
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
            const textoSpan = btn.querySelector('.fecha-texto');
            textoSpan.textContent = fecha;
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

// Cerrar cualquier dropdown si se hace click fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.lista-destinos, .lista-fechas').forEach(ul => {
        ul.classList.remove('visible');
    });
});

// --- Contadores de pasajeros (+ / -) ---
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

// --- Intercambiar Origen y Destino ---
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
// --- Horarios disponibles (ejemplo) ---
const horariosDisponibles = [
    "07:00 AM", "09:30 AM", "12:00 PM",
    "03:15 PM", "06:45 PM", "09:00 PM"
];

const btnHora = document.getElementById('btnHora');
const listaHoras = document.getElementById('listaHoras');

if (btnHora && listaHoras) {
    listaHoras.innerHTML = "";
    horariosDisponibles.forEach(hora => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-regular fa-clock"></i>${hora}`;
        li.addEventListener('click', () => {
            btnHora.querySelector('.fecha-texto').textContent = hora;
            listaHoras.classList.remove('visible');
            btnHora.classList.remove('abierto');
        });
        listaHoras.appendChild(li);
    });

    btnHora.addEventListener('click', (e) => {
        e.stopPropagation();
        listaHoras.classList.toggle('visible');
        btnHora.classList.toggle('abierto');
    });
}

// --- Botón Continuar (validación básica) ---
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
// en script.js
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
// --- Dropdown de hora de salida en el resumen (compra2.html) ---
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
function irAPaso(numeroPaso) {
    document.querySelectorAll('.stepper-punto').forEach(punto => {
        // Solo el punto que coincide con el paso actual se marca activo
        punto.classList.toggle('activo', parseInt(punto.dataset.paso) === numeroPaso);
    });
    document.querySelector('.stepper').dataset.pasoActual = numeroPaso;
    actualizarStepper();
}
// --- Posicionar el camión sobre el punto del paso actual ---
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

window.addEventListener('load', actualizarStepper);
window.addEventListener('resize', actualizarStepper);

window.addEventListener('load', actualizarStepper);
window.addEventListener('resize', actualizarStepper);

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
// --- Página Detalles de compra (compras4.html) ---
const detalleCompraEl = document.getElementById('detalleNombrePasajero');

if (detalleCompraEl) {
    const compra = JSON.parse(localStorage.getItem('flechaRojaCompra')) || {};

    document.getElementById('rutaOrigen').textContent = compra.origen || "Origen";
    document.getElementById('rutaDestino').textContent = compra.destino || "Destino";
    document.getElementById('detalleFecha').textContent = compra.fechaSalida || "--/--/----";
    document.getElementById('detalleHora').textContent = compra.horaSalida || "-- : --";
    document.getElementById('detalleTotalPasajeros').textContent = compra.totalPasajeros || "1";
    document.getElementById('detalleNombrePasajero').textContent = compra.nombrePasajero || "Nombre del pasajero";

    // Generar código QR con la info del boleto
    const datosQR = `Flecha Roja | ${compra.origen || ""} - ${compra.destino || ""} | ${compra.fechaSalida || ""} ${compra.horaSalida || ""} | Pasajero: ${compra.nombrePasajero || ""}`;
    const qrImg = document.getElementById('qrBoleto');
    if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(datosQR)}`;
    }

    // Botón descargar boleto (descarga la imagen del QR)
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
    // Botón volver al inicio
const btnVolverInicio = document.getElementById('btnVolverInicio');
if (btnVolverInicio) {
    btnVolverInicio.addEventListener('click', () => {
        localStorage.removeItem('flechaRojaCompra'); // limpia la compra guardada
        window.location.href = 'comprasr.html'; // ajusta si tu página principal se llama distinto
    });
}


}