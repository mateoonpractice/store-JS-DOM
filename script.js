// Clase para representar un Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase para gestionar el Carrito de Compras
class CarritoDeCompras {
  constructor() {
    this.productosEnCarrito = [];
    this.listaCarritoElemento = document.getElementById('lista-carrito');
    this.totalElemento = document.getElementById('total');
    this.botonVaciar = document.getElementById('vaciar-carrito');
    this.botonComprar = this.crearBotonComprar();

    this.inicializarEventos();
    this.actualizarBotonComprar(); // Estado inicial del botón
  }

  crearBotonComprar() {
    let btnComprar = document.getElementById('comprar-pagar');
    if (!btnComprar) {
      btnComprar = document.createElement('button');
      btnComprar.id = 'comprar-pagar';
      btnComprar.classList.add('btn', 'btn-success', 'btn-sm', 'ms-2');
      btnComprar.textContent = 'Comprar y Pagar';
      btnComprar.disabled = true; // Deshabilitado por defecto
      this.botonVaciar.parentNode.appendChild(btnComprar);
    }
    return btnComprar;
  }

  inicializarEventos() {
    // Evento para los botones "Agregar" de los productos
    const botonesAgregar = document.querySelectorAll('.product-card .btn-outline-primary');
    botonesAgregar.forEach(boton => {
      boton.addEventListener('click', (evento) => {
        evento.preventDefault();
        const tarjetaProducto = boton.closest('.product-card');
        const nombreProducto = tarjetaProducto.querySelector('.card-title').textContent.trim();
        const precioTexto = tarjetaProducto.querySelector('.text-primary').textContent.trim();
        const precioLimpio = precioTexto.replace(/[^0-9.]/g, '').replace(',', '');
        const precioProducto = parseFloat(precioLimpio);

        const nuevoProducto = new Producto(nombreProducto, precioProducto);
        this.agregarProducto(nuevoProducto);
      });
    });

    // Evento para el botón "Vaciar Carrito"
    this.botonVaciar.addEventListener('click', () => {
      this.vaciarCarrito();
    });

    // Evento para el botón "Comprar y Pagar" (aquí iría la lógica de pago real)
    this.botonComprar.addEventListener('click', () => {
      if (this.productosEnCarrito.length > 0) {
        alert('¡Gracias por tu compra! Tu pedido está en camino.');
        this.vaciarCarrito();
      } else {
        alert('Tu carrito está vacío. Agrega productos antes de comprar.');
      }
    });
  }

  agregarProducto(producto) {
    this.productosEnCarrito.push(producto);
    this.mostrarProductoEnCarrito(producto);
    this.actualizarTotal();
    this.actualizarBotonComprar();
  }

  mostrarProductoEnCarrito(producto) {
    const itemLista = document.createElement('li');
    itemLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    itemLista.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    botonEliminar.textContent = 'Eliminar';

    // Usamos una función anónima para capturar el 'producto' correcto en el cierre
    botonEliminar.addEventListener('click', () => {
      this.eliminarProducto(producto, itemLista);
    });

    itemLista.appendChild(botonEliminar);
    this.listaCarritoElemento.appendChild(itemLista);
  }

  eliminarProducto(productoAEliminar, elementoDOM) {
    // Filtramos el array para quitar el producto
    this.productosEnCarrito = this.productosEnCarrito.filter(p => p !== productoAEliminar);
    // Removemos el elemento del DOM
    this.listaCarritoElemento.removeChild(elementoDOM);
    this.actualizarTotal();
    this.actualizarBotonComprar();
  }

  actualizarTotal() {
    const totalCalculado = this.productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    this.totalElemento.textContent = totalCalculado.toFixed(2);
  }

  vaciarCarrito() {
    this.productosEnCarrito = []; // Limpiar el array
    this.listaCarritoElemento.innerHTML = ''; // Limpiar el DOM
    this.actualizarTotal(); // Reiniciar el total
    this.actualizarBotonComprar(); // Deshabilitar el botón de comprar
  }

  actualizarBotonComprar() {
    this.botonComprar.disabled = this.productosEnCarrito.length === 0;
  }
}

// Inicializar el carrito cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  new CarritoDeCompras();
});