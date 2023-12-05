const url = 'http://127.0.0.1:8000'

const obtenerDatos = async () => {
  try {
    const response = await fetch(`${url}/all_muebles/`);
    if (response.ok) {
      const data = await response.json();
      mostrarDatosEnHTML(data);
    } else {
      console.error('Error al obtener los datos');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}


const mostrarDatosEnHTML = (data) => {
  let html = ''
  if (data.length == 0) {
    html = `
      <article class="product-card">
        <h1>No hay productos por mostrar :/</h1>
      </article>
    `
  } else {
    for(let i = 0; i < data.length; i++) {
      html += `
        <article class="product-card">
          <h1>${data[i].nombre}</h1>
          <img src=${data[i].imagen} alt=${data[i].nombre}>
          <button>
            <a href="../../webpython/detalle_producto.html?producto=${data[i].id}"> Detalle ${data[i].nombre}</a>
          </button>
        </article>
      `
    }
  }
 
  const productosHtml = document.querySelector('.list-products')
  productosHtml.insertAdjacentHTML('beforeend', html)
}
      
// Llamada a la función
obtenerDatos();
