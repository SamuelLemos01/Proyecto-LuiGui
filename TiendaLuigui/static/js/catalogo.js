document.addEventListener("DOMContentLoaded", function () {
    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let currentCategory = "todos";
    let productos = [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    async function fetchProducts() {
        try {
            const response = await fetch("/api/productos/");
            productos = await response.json();
            updateDisplay();
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }

    function filterProducts(category) {
        return category === "todos" ? productos : productos.filter(p => p.categoria === category);
    }

    function displayProducts(products, page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const paginatedProducts = products.slice(start, start + ITEMS_PER_PAGE);
        const container = document.getElementById("productos-container");
        container.innerHTML = "";

        paginatedProducts.forEach(product => {
            container.innerHTML += `
                <div class="producto" data-categoria="${product.categoria}">
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
                </div>
            `;
        });
    }

    function updatePagination(products) {
        const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        // Botón "Anterior"
        const prevButton = document.createElement("li");
        prevButton.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevButton.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                updateDisplay();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updateDisplay();
            });
            paginationContainer.appendChild(pageItem);
        }

        // Botón "Siguiente"
        const nextButton = document.createElement("li");
        nextButton.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextButton.innerHTML = `
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplay();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    function updateDisplay() {
        const filteredProducts = filterProducts(currentCategory);
        displayProducts(filteredProducts, currentPage);
        updatePagination(filteredProducts);
    }

    const modal = document.getElementById("productModal");
    const quantityInput = document.getElementById("quantity");
    const addToCartBtn = document.getElementById("addToCartBtn");

    modal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget;
        modal.querySelector("#productTitle").textContent = button.getAttribute("data-title");
        modal.querySelector("#productDescription").textContent = button.getAttribute("data-description");
        modal.querySelector("#productPrice").textContent = `$${button.getAttribute("data-price")}`;
        modal.querySelector("#productImage").src = button.getAttribute("data-image");
        modal.setAttribute("data-product-id", button.getAttribute("data-id"));
        quantityInput.value = 1;
    });

    if (addToCartBtn) {  // Solo agregar el evento si el botón existe
        addToCartBtn.addEventListener("click", function () {
            const id = modal.getAttribute("data-product-id");
            const cantidad = parseInt(quantityInput.value);
            const producto = {
                id: id,
                nombre: modal.querySelector("#productTitle").textContent,
                precio: parseFloat(modal.querySelector("#productPrice").textContent.replace("$", "")),
                imagen: modal.querySelector("#productImage").src,
                cantidad: cantidad
            };

            const existingProduct = carrito.find(p => p.id === id);
            if (existingProduct) {
                existingProduct.cantidad += cantidad;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            
            // Limpiar modal y backdrop correctamente
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            
            // Remover backdrop y restaurar scroll
            setTimeout(() => {
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
                document.body.classList.remove('modal-open');
                document.body.style.removeProperty('overflow');
                document.body.style.removeProperty('padding-right');
            }, 300);

            // Mostrar alerta
            const alert = document.createElement('div');
            alert.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            alert.style.zIndex = '9999';
            alert.textContent = 'Producto agregado al carrito';
            document.body.appendChild(alert);
            setTimeout(() => alert.remove(), 2000);
        });
    }

    document.getElementById("decrementBtn").addEventListener("click", () => {
        const currentVal = parseInt(quantityInput.value);
        if (currentVal > 1) {
            quantityInput.value = currentVal - 1;
        }
    });

    document.getElementById("incrementBtn").addEventListener("click", () => {
        const currentVal = parseInt(quantityInput.value);
        quantityInput.value = currentVal + 1;
    });

    document.querySelectorAll(".btn-verde").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".btn-verde").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            currentCategory = this.className.match(/todos|aseo|comestibles|canastafamiliar|papeleria/)[0];
            currentPage = 1;
            updateDisplay();
        });
    });

    fetchProducts();
});