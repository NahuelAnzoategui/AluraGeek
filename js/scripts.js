// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

// Función para cargar productos desde el servidor
function cargarProductos() {
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(productos => {
            const productosContainer = document.getElementById('productos');
            productosContainer.innerHTML = ''; // Limpiar contenedor
            productos.forEach(producto => {
                crearCardProducto(producto, productosContainer);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para crear y agregar una card al DOM
function crearCardProducto(producto, container) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = `producto-${producto.id}`; // Asignar ID único
    newCard.innerHTML = `
        <img src="${producto.urlImage}" alt="${producto.name}">
        <h3>${producto.name}</h3>
        <div class="infoProducto">
            <p>$${producto.price}</p>
            <button class="delete-btn" data-id="${producto.id}">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
    container.appendChild(newCard);
}

// Evento para enviar el formulario
document.getElementById('productoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const urlImage = document.getElementById('urlImage').value;

    const producto = { name, price, urlImage };

    fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
    })
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById('productos');
            crearCardProducto(data, productosContainer);
            alert('Producto agregado correctamente!');
        })
        .catch(error => console.error('Error al guardar el producto:', error));
});

// Evento de delegación para eliminar productos
document.getElementById('productos').addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
        const button = event.target.closest('.delete-btn');
        const productId = button.getAttribute('data-id');
        eliminarProducto(productId);
    }
});

// Función para eliminar un producto
function eliminarProducto(productId) {
    console.log('Intentando eliminar producto con ID:', productId);
    fetch(`http://localhost:3000/productos/${productId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                console.log('Producto eliminado del servidor');
                const card = document.getElementById(`producto-${productId}`);
                if (card) {
                    card.remove();
                    console.log('Card eliminada del DOM');
                } else {
                    console.error('Card no encontrada en el DOM');
                }
            } else {
                console.error('Error al eliminar el producto en el servidor');
            }
        })
        .catch(error => console.error('Error en la solicitud DELETE:', error));
}
