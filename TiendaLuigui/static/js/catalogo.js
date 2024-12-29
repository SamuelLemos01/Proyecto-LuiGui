document.addEventListener('DOMContentLoaded', function() {
    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let currentCategory = 'todos';
    let productos = [];
    
    // Función para obtener los productos de la API
    async function fetchProducts() {
        try {
            const response = await fetch('/api/productos/');
            productos = await response.json();
            updateDisplay();
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }
    
    // Función para filtrar productos por categoría
    function filterProducts(category) {
        return category === 'todos' 
            ? productos 
            : productos.filter(product => product.categoria === category);
    }
    
    // Función para mostrar los productos en la página
    function displayProducts(products, page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const paginatedProducts = products.slice(start, end);
        
        const container = document.getElementById('productos-container');
        container.innerHTML = '';
        
        paginatedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'producto';
            productElement.setAttribute('data-categoria', product.categoria);
            
            productElement.innerHTML = `
                <img src="/media/${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>${product.descripcion}</p>
                <div class="precio">
                    <p>$${product.precio}</p>
                    <button class="btn-comprar btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#productModal"
                        data-id="${product.id}"
                        data-title="${product.nombre}"
                        data-description="${product.descripcion}"
                        data-price="${product.precio}"
                        data-image="/media/${product.imagen}">
                        Comprar
                    </button>
                </div>
            `;
            
            container.appendChild(productElement);
        });
    }
    
    // Función para actualizar la paginación
    function updatePagination(filteredProducts) {
        const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `
            <button class="page-link" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
        `;
        pagination.appendChild(prevLi);
        
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${currentPage === i ? 'active' : ''}`;
            li.innerHTML = `
                <button class="page-link">${i}</button>
            `;
            pagination.appendChild(li);
        }
        
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `
            <button class="page-link" ${currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
        `;
        pagination.appendChild(nextLi);
        
        document.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', function(e) {
                const text = this.textContent;
                if (text === 'Anterior' && currentPage > 1) {
                    currentPage--;
                } else if (text === 'Siguiente' && currentPage < totalPages) {
                    currentPage++;
                } else if (!isNaN(text)) {
                    currentPage = parseInt(text);
                }
                updateDisplay();
            });
        });
    }
    
    function updateDisplay() {
        const filteredProducts = filterProducts(currentCategory);
        displayProducts(filteredProducts, currentPage);
        updatePagination(filteredProducts);
    }
    
    // Configuración del modal
    const modal = document.getElementById('productModal');
    const quantityInput = document.getElementById('quantity');
    
    modal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
        
        modal.querySelector('#productTitle').textContent = title;
        modal.querySelector('#productDescription').textContent = description;
        modal.querySelector('#productPrice').textContent = `$${price}`;
        modal.querySelector('#productImage').src = image;
        quantityInput.value = 1;
    });
    
    // Eventos para los botones de cantidad
    document.getElementById('decrementBtn').addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    document.getElementById('incrementBtn').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    
    // Configuración de filtros de categoría
    document.querySelectorAll('.btn-verde').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.btn-verde').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.classList.contains('todos') ? 'todos' : 
                            this.classList.contains('aseo') ? 'aseo' :
                            this.classList.contains('comestibles') ? 'comestibles' :
                            this.classList.contains('canastafamiliar') ? 'canastafamiliar' : 'papeleria';
            
            currentPage = 1;
            updateDisplay();
        });
    });
    
    // Iniciar carga de productos
    fetchProducts();
});