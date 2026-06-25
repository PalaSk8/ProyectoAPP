// =========================================
// MOTOR FÍSICO 3D (ARRASTRE E INERCIA)
// =========================================

const imageUrls = [
    "https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/698808/pexels-photo-698808.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2449540/pexels-photo-2449540.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const contenedorAnillo = document.getElementById('anillo-3d');
const zonaArrastre = document.querySelector('.contenedor-galeria');
const imagenesHTML = []; // Guardaremos las etiquetas img aquí para el efecto hover

// 1. Inyectar las imágenes en el anillo
imageUrls.forEach((url, indice) => {
    const img = document.createElement('img');
    img.src = url;
    
    const angulo = (indice / imageUrls.length) * 360;
    img.style.transform = `rotateY(${angulo}deg) translateZ(var(--radio-anillo))`;
    
    // EFECTO HOVER PREMIUM: 
    img.addEventListener('mouseenter', () => {
        if (isDragging) return; // Si está girando, no hacemos el efecto
        imagenesHTML.forEach(otraImg => {
            if (otraImg !== img) otraImg.classList.add('atenuada');
        });
    });

    img.addEventListener('mouseleave', () => {
        imagenesHTML.forEach(otraImg => otraImg.classList.remove('atenuada'));
    });

    imagenesHTML.push(img);
    contenedorAnillo.appendChild(img);
});

// 2. Variables para la física de arrastre
let rotacionActual = 0;
let rotacionObjetivo = 0;
let isDragging = false;
let startX = 0;
let velocity = 0;

// Funciones para detectar dónde está el dedo/mouse
const getPosicionX = (e) => e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

const iniciarArrastre = (e) => {
    isDragging = true;
    startX = getPosicionX(e);
    velocity = 0; // Detenemos cualquier inercia previa
};

const arrastrar = (e) => {
    if (!isDragging) return;
    
    // Evitamos que la pantalla haga scroll en celular mientras giramos el anillo
    if (e.type === 'touchmove') e.preventDefault(); 
    
    const currentX = getPosicionX(e);
    const deltaX = currentX - startX;
    
    // Sensibilidad del arrastre (0.2 es un buen balance)
    velocity = deltaX * 0.2; 
    rotacionObjetivo += velocity;
    
    startX = currentX;
};

const terminarArrastre = () => {
    isDragging = false;
    // INERCIA: Al soltar, multiplicamos la última velocidad para que siga girando
    rotacionObjetivo += velocity * 25; 
};

// Eventos de Mouse (Computadora)
zonaArrastre.addEventListener('mousedown', iniciarArrastre);
document.addEventListener('mousemove', arrastrar);
document.addEventListener('mouseup', terminarArrastre);

// Eventos Touch (Celular)
zonaArrastre.addEventListener('touchstart', iniciarArrastre, { passive: true });
document.addEventListener('touchmove', arrastrar, { passive: false });
document.addEventListener('touchend', terminarArrastre);

// 3. El Bucle de Animación (Lerp)
function animar() {
    // La magia del Lerp: Acercar la rotación actual al objetivo suavemente
    // El 0.05 es la fricción. Entre más bajo, más resbala.
    rotacionActual += (rotacionObjetivo - rotacionActual) * 0.05;
    
    // Aplicamos el giro al HTML
    contenedorAnillo.style.transform = `rotateY(${rotacionActual}deg)`;
    
    // Le pedimos al navegador que ejecute esto 60 veces por segundo
    requestAnimationFrame(animar);
}

// Arrancamos el motor
animar();

//-------------------------navegación-------------------------
    
// 1. Seleccionamos todos los botones de la barra de navegación
const navItems = document.querySelectorAll('.nav-item');

// 2. Le decimos a cada botón que esté atento a cuando le den "click" (o tap en celular)
navItems.forEach(item => {
  item.addEventListener('click', function(evento) {
    // Evitamos que la página se recargue (esto es solo para esta prueba visual)
    evento.preventDefault(); 
    
    // 3. Primero, le quitamos la clase "active" a TODOS los botones
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // 4. Luego, le agregamos la clase "active" SOLAMENTE al botón que acabas de tocar
    this.classList.add('active');
  });
});