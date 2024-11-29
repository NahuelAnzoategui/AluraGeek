// Funcion para obtener datos de los personajes dentro de una api

const url = "./data/productos.json";

async function getProductos(){
    // cargar los datos

    try {
        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        return data.productos;
        
    } catch (error) {
        console.log(error.message);
    }

}

// funcion para mostrar los productos en la pagina

async function displayProductos(){

    const productos = await getProductos();
    const container = document.querySelector('#productos');
    // console.log(characters)

    productos.forEach((productos) => {
        //callback funcion dentro de otra funcion

        const productosElements = document.createElement('DIV');
        productosElements.classList.add('container-flex');

        productosElements.innerHTML = `
        
          <div class="card" id="productos">
                    <img src="${productos.imageUrl}" alt="imagen gameboy clasic">
                    <h3>${productos.name}</h3>
                    <div class="infoProducto">
                        <p>${productos.price}</p>
                    <button class="delete-btn" data-id="1"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>

        `;

    container.appendChild(productosElements);

    }
)

}

displayProductos();