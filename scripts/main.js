async function getApi() {
    const response = await fetch(
      'http://makeup-api.herokuapp.com/api/v1/products.json'
    );
    const items = await response.json();
    getInfo(items);
  }
  
  async function getInfo(prodRest) {
    prodRest.filter(datos => {
      let text = `<img src="${datos.image_link}"/>
      <h2>${datos.name} </h2>
      <p>$ ${datos.price}</p>`
      const div = document.getElementById('productos')
      div.innerHTML += text 
    })
  
  }
  getApi()


  /*datos.brand = button.innerHTML*/
