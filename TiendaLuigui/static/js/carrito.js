document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    function actualizarCarritoUI() {
        const contenedor = document.getElementById('productos-carrito-container');
        const carritoVacio = document.getElementById('carrito-vacio');
        const resumen = document.getElementById('resumen-carrito');
        
        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            contenedor.style.display = 'none';
            resumen.style.display = 'none';
            return;
        }
        
        carritoVacio.style.display = 'none';
        contenedor.style.display = 'block';
        resumen.style.display = 'block';
        
        contenedor.innerHTML = carrito.map(producto => `
            <div class="producto-carrito">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-precio">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    <div class="producto-cantidad">
                        <!--  <button class="btn btn-outline-secondary btn-cantidad" 
                                onclick="modificarCantidad('${producto.id}', -1)">-</button> -->
                        <span class="cantidad-valor">Cantidad: ${producto.cantidad}</span>
                        <!-- <button class="btn btn-outline-secondary btn-cantidad" 
                                onclick="modificarCantidad('${producto.id}', 1)">+</button> -->
                    </div>
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join('');
        
        const subtotal = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
        const domicilio = 3000;
        document.getElementById('subtotal').textContent = `$${subtotal}`;
        document.getElementById('domicilio').textContent = `$${domicilio}`;
        document.getElementById('total').textContent = `$${(subtotal + domicilio)}`;
    }
    
    // Definir las funciones en el alcance global
    window.modificarCantidad = function(id, cambio) {
        const producto = carrito.find(p => p.id === id);
        if (producto && (producto.cantidad + cambio) > 0) {
            producto.cantidad += cambio;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarritoUI();
        }
    };
    
    window.eliminarProducto = function(id) {
        carrito = carrito.filter(p => p.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
    };
    
    document.getElementById('btn-proceder').addEventListener('click', () => {
        alert('Procesando pago...');
    });
    
    actualizarCarritoUI();
});