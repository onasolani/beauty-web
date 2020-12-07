/*jshint -W033 */

async function getApi() {
    const response = await fetch('scripts/makeup.json');
    const items = await response.json(); 
    let itemsArray = items.map(item => {
      itemObj = {
        name: item.name,
        price: item.price,
        imagen: item.image_link,
        description: item.description,
        brand: item.brand,
        id: item.id
      }
      return itemObj;
    })
    localStorage.setItem('datos', JSON.stringify(itemsArray));
    return itemsArray
  }

function printProduct(dato){
  let productString = 
  `<div class="contenedor-prodCard">
  <div class="productosolo">
      <div class="singleProd">
        <a href="#" target="_blank">
          <div class="img-prod"><img src="${dato.imagen}"/></div>
          <h2>${dato.name} </h2>
        </a>
      </div>
      <div class="single-price">
        <p>$ <span>${dato.price}</span></p>
        <button id="${dato.id}" class="add-item-btn" onclick=pushToCard(this)><span>Add to cart</span></button>   
      </div>          
    </div>
  </div>`
  return productString;
}


// Producto en ventana emergente
function printProductCard(printItem){
  let productToPrint = `
  <tr class="product-item">
      <td class="action">
          <button class="btn btn-remove">Remove</button>
      </td>
      <td class="img-item">
          <div class="img-box-table">
              <img src="${printItem.img}"/>
          </div>
      </td>
      <td class="name-item">
        <span>${printItem.name}</span>
      </td>
      <td class="price-item">$<span>${printItem.price}</span></td>
      <td class="quantity-item">
        <input type="number" value="1" min="1"/>
      </td>
      <td class="subtotal">$<span>${printItem.price}</span></td></tr>`
      
  return productToPrint
  };

  //para que se muestre la actualizacion del carrito hay que hacer refresh
  async function printCart(){
    let productos = await getAllProducts()
    stringToPrint = ""
    productos.map(element => {
      stringToPrint += printProductCard(element)
    });
    document.getElementById('card-item').innerHTML = stringToPrint;
  }

// Descargar cosas del localStorage
const getAllProducts = () => {
  const cartStr = localStorage.getItem("cart");
  const cartArr = JSON.parse( cartStr );
  if (cartArr === null) {
    return [];
  } else {
    return cartArr;
  }

}


// Subir cosas en el localStorage
const saveNewItem = (newItem) => {
  const cartArr = getAllProducts();
  cartArr.push(newItem);
  const cartStr = JSON.stringify(cartArr);
  localStorage.setItem("cart", cartStr);
  console.log(localStorage.getItem("cart"))
}

function pushToCard(product){
  let divProd = product.parentElement.parentElement;
  let prodName = divProd.querySelector('h2').textContent;
  let prodPrice = divProd.querySelector('span').textContent;
  let prodImg = divProd.querySelector('img').src;

let prodObj = {
   name: prodName,
   price: prodPrice,
   img: prodImg
}

saveNewItem(prodObj)
}


  // filtrar las marcas y ordenar los productos                    
  async function getInfo(selectedBrand, sortMethod) {
  
    if(selectedBrand !== undefined){
      selectedBrand = selectedBrand.textContent;
    }
    if(sortMethod !== undefined){
      sortMethod = sortMethod.textContent;
    }

    let prodRest = await getApi()
    
    let stringToPrint = "";
    let filterProducts = prodRest.filter(prod => {
     
      if (selectedBrand === undefined){
        return true
      } 
      if (prod.brand === selectedBrand){
        return true;
      } else {
        return false;
      }
    })
    .sort((a,b) => {
      if (sortMethod === undefined){
        return true
      } 
      if(sortMethod === 'high to low'){
        return b.price-a.price;

      } else{
        return a.price-b.price;
      }

    })
    .map(prod => {
      stringToPrint += printProduct(prod)
    })    

      const div = document.getElementById('productos')
      div.innerHTML = stringToPrint
  
  }

getInfo()



// generar los botones para cada una de las marcas
  async function brandsButton(){
    let items = await getApi()
    let brandNames = [];
    items.forEach(function(item){
      brandNames.push(item.brand)
    });

    let unBrand = []
    let brandBox = document.querySelector('.filter-buttons');
    brandBox.innerHTML = ""
    brandNames.forEach(function(brand){
      if(!unBrand.includes(brand) && brand !== null && unBrand.length <= 13){
        unBrand.push(brand)
        brandBox.innerHTML += `<button class="filters" onclick=getInfo(this)>${brand}</button>`;
      } 
    });
  }
  brandsButton()