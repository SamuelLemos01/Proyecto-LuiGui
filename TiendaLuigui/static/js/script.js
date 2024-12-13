// Menu
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.items-navbar');
let cerrarBtn = document.querySelector('.cerrar-icono');

menu.onclick = () => {
    navlist.classList.toggle('open');
}

cerrarBtn.onclick = () => {
    navlist.classList.remove('open');
}

window.onscroll = () => {
    navlist.classList.remove('open');
}


// --- CATÁLOGO --- //
const categorias = {
    todos: document.querySelector('.todos'),
    aseo: document.querySelector('.aseo'),
    comestibles: document.querySelector('.comestibles'),
    canastafamiliar: document.querySelector('.canastafamiliar'),
    papeleria: document.querySelector('.papeleria'),
};

const mostrarProductos = (categoria = 'todos') => {
    document.querySelectorAll('.producto').forEach(producto => {
        producto.style.display = categoria === 'todos' || producto.dataset.categoria === categoria ? 'block' : 'none';
    });
};

// Eventos para filtrar productos
Object.keys(categorias).forEach(key => {
    categorias[key].addEventListener('click', () => mostrarProductos(key));
});

mostrarProductos(); // Mostrar todos al inicio

// --- MODAL DE PRODUCTOS --- //
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('#productImage');
    const modalDescription = modal.querySelector('#productDescription');
    const modalPrice = modal.querySelector('#productPrice');

    document.querySelectorAll('.btn-comprar').forEach(button => {
        button.addEventListener('click', () => {
            modalTitle.textContent = button.getAttribute('data-title') || 'Sin título';
            modalImage.src = button.getAttribute('data-image') || '/images/default.png';
            modalDescription.textContent = button.getAttribute('data-description') || 'Sin descripción';
            modalPrice.textContent = `Precio: ${button.getAttribute('data-price') || 'Sin precio'}`;
        });
    });
});

