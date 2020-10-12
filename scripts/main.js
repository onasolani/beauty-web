async function getApi() {
    const response = await fetch(
      'http://makeup-api.herokuapp.com/api/v1/products.json'
    );
    const items = await response.json();
    return items;
  }
  
  async function getInfo() {
    const productes = await getApi();
    const oneProd = productes[0]

    let text = `<img src="${oneProd.image_link}"/>
    <h2>${oneProd.name} </h2>
    <p>$ ${oneProd.price}</p>`
    const div = document.getElementById('productos')
    div.innerHTML += text

    console.log(text)
    
  }
  getInfo();
  