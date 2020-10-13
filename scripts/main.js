async function getApi() {
    const response = await fetch('scripts/makeup.json'
    );
    const items = await response.json();
    getInfo(items);
  }
  
  async function getInfo(prodRest) {
    prodRest.filter(dato => {
      let text = `<div><div class="img-prod"><img src="${dato.image_link}"/></div>
      <h2>${dato.name} </h2>
      <p>$ ${dato.price}</p></div>`
      const div = document.getElementById('productos')
      div.innerHTML += text
    })
  
  }
  getApi()


  //añadir url html en la img.

  /*datos.brand = button.innerHTML*/ 

// pasarle la funcion a la otra pagina
// metodo find buscar por id en una ventada emergente


//hacer otra llamada y encontrarlo por id