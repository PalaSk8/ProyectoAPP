const imageUrls = [
  "https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/698808/pexels-photo-698808.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2449540/pexels-photo-2449540.jpeg?auto=compress&cs=tinysrgb&w=400"
];

const contenedorAnillos = document.getElementById('anillo-3d');

imageUrls.forEach((url, indice) => {
    const img = document.createElement('img');
    img.src = url;

    const angle = (indice / imageUrls.length) * 360;


    img.style.transform = `rotateY(${angle}deg) translateZ(300px)`;
    contenedorAnillos.appendChild(img);});


    
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