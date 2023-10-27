const lista_productos = [
  {
    titulo: "Mesa Redonda",
    precio: 80000,
    color: "blanco, negro, natural",
    medidas: "100cm de diámetro x 75cm",
    descripcion: "Madera maciza con pata central pintada ",
    imagen: "./images/pexels-tiana-2995012.jpg"
  },
  {
    titulo: "Silla comedor",
    precio: 40000,
    color: "Roble, Nogal y Wengue",
    medidas: "88cm x 43cm",
    descripcion: "Madera maciza con respaldo curvo",
    imagen: "./images/silla1.jpeg"
  },
  {
    titulo: "Cama con cajones",
    precio: 150000,
    color: "Natural o blanco",
    medidas: "1 plaza o 2 plazas",
    descripcion: "Cama con cajones y baulera",
    imagen: "./images/cama.jpg"
  }
]

const urlParams = new URLSearchParams(window.location.search)
const id_producto = parseInt(urlParams.get('producto'))

let html

if(isNaN(id_producto) || (0 >= id_producto || id_producto > lista_productos.length)) {
  html = `
    <article>
      <h1>No hay un producto con ese indice</h1>
      <p>:/</p>
    </article>
  `
} else {
  let producto = lista_productos[id_producto-1]

  html = `
    <article class="card">
      <div>
        <img src=${producto.imagen} alt=${producto.titulo} class="img-producto">
      </div>
      <div class="info">
        <div>
          <h1 class="titulo">${producto.titulo}</h1>
          <h2 class="descripcion">${producto.descripcion}</h2>
        </div>
        <div>  
          <p class="color">Color: ${producto.color}</p>
          <p class="medida">Medidas: ${producto.medidas}</p>
          <strong class="precio">Precio: $${producto.precio}</strong>
        </div>
      </div>
    </article>
  `
}

const detalleHtml = document.querySelector('main')
detalleHtml.insertAdjacentHTML('beforeend', html)