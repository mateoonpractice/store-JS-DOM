// Array para almacenar los productos del carrito
let carrito = [];

// Seleccionar todos los botones "Agregar"
const botonesAgregar = document.querySelectorAll('.product-card .btn-outline-primary');

// Seleccionar el contenedor donde se mostrarán los productos del carrito
const listaCarrito = document.getElementById('lista-carrito');

// Seleccionar el span donde se muestra el total
const totalSpan = document.getElementById('total');

// Seleccionar el botón para vaciar el carrito
const btnVaciar = document.getElementById('vaciar-carrito');
// Crear y agregar el botón 'Comprar y Pagar' si no existe
let btnComprar = document.getElementById('comprar-pagar');
if (!btnComprar) {
  btnComprar = document.createElement('button');
  btnComprar.id = 'comprar-pagar';
  btnComprar.classList.add('btn', 'btn-success', 'btn-sm', 'ms-2');
  btnComprar.textContent = 'Comprar y Pagar';
  btnComprar.disabled = true;
  btnVaciar.parentNode.appendChild(btnComprar);
}

// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  // Crear objeto del producto
  const producto = { nombre, precio };

  // Agregar al array
  carrito.push(producto);

  // Crear elemento en el DOM
  const item = document.createElement('li');
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = `${nombre} - $${precio}`;

  // Botón para eliminar este producto
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('btn', 'btn-sm', 'btn-outline-danger');
  btnEliminar.textContent = 'Eliminar';

  // Evento para eliminar este producto
  btnEliminar.addEventListener('click', () => {
    listaCarrito.removeChild(item); // quitar del DOM
    carrito = carrito.filter(p => p !== producto); // quitar del array
    actualizarTotal(); // actualizar total
    actualizarBotonComprar();
  });

  item.appendChild(btnEliminar);
  listaCarrito.appendChild(item);

  // Actualizar el total
  actualizarTotal();
  actualizarBotonComprar();
}

// Función para actualizar el total
function actualizarTotal() {
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  totalSpan.textContent = total.toFixed(2);
  actualizarBotonComprar();
}

// Función para habilitar/deshabilitar el botón 'Comprar y Pagar'
function actualizarBotonComprar() {
  btnComprar.disabled = carrito.length === 0;
}

// Función para manejar clics en botones "Agregar"
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', e => {
    e.preventDefault();

    const card = boton.closest('.product-card');
    const nombre = card.querySelector('.card-title').textContent.trim();
    const precioTexto = card.querySelector('.text-primary').textContent.trim();
    const precioLimpio = precioTexto.replace(/[^0-9.]/g, '').replace(',', '');
    const precio = parseFloat(precioLimpio);

    agregarAlCarrito(nombre, precio);
  });
});

// Vaciar el carrito completamente
btnVaciar.addEventListener('click', () => {
  carrito = []; // limpiar array
  listaCarrito.innerHTML = ''; // limpiar DOM
  actualizarTotal(); // reiniciar total
  actualizarBotonComprar();
});
