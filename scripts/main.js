/*jshint -W033 */

async function getApi() {
    const response = await fetch('scripts/makeup.json'
    );
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




  // let getData = localStorage.getItem('datos');
// let itemsToCart = []
// itemsToCart.push()
  
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
                        
                        <button id="${dato.id}" class="add-item-btn" onclick=pushToCard(this)>Add to cart</button>
                        
              </div>
              
  </div></div>`
  return productString;
}


// Producto en ventana emergente

function printProductCard(printItem){
  // let tabla = document.querySelector('#card-item"')
  // const row = tabla.createElement('tr');
  // row.className = "product-item";
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
      <input type="number" value="0" min="0"/>
      </td>
      <td class="subtotal">$<span>0</span></td></tr>`
      
  return productToPrint
  // tabla.appendChild(row)
  };




  //para que se muestre la actualizacion del carrito hay que hacer refresh
  async function printCart(){
    let productos = await getAllProducts()
    // console.log("hola", productos)
    stringToPrint = ""
    productos.map(element => {
  stringToPrint += printProductCard(element)
    });
    // console.log(stringToPrint)
    document.getElementById('card-item').innerHTML = stringToPrint;
  }



// Descargar cosas del localStorage
const getAllProducts = () => {
  // recuperar el string
  const cartStr = localStorage.getItem("cart");
  // convertir el string a un array
  const cartArr = JSON.parse( cartStr );

  // si todavia no hay usuarios, devuelve un array vacio
  if (cartArr === null) {
    return [];
  } else {
    return cartArr;
  }

}


// Subir cosas en el localStorage
const saveNewItem = (newItem) => {

  // recuperar el array de los productos del localStorage
  const cartArr = getAllProducts();

  // actualizar el array de compra
  cartArr.push(newItem);

  // convertir el array a un string
  const cartStr = JSON.stringify(cartArr);

  // almacenar lo de nuevo
  localStorage.setItem("cart", cartStr);
  console.log(localStorage.getItem("cart"))
}

// document.addEventListener("load", crearCarrito())
// function crearCarrito(){
//   // let carrito = {
//   //   producto: ""
//   // }
//   var carrito = new Array()
//   localStorage.setItem("cart", JSON.stringify(carrito))
// }


// function addListener(){
//   console.log("hola")
//   btnPurchase = document.getElementsByClassName('add-item-btn');
//   console.log(btnPurchase)
//   for(let i=0; i< btnPurchase.length; i++){
//     btnPurchase[i].addEventListener("click", pushToCard())
//   }
//       // btnPurchase.forEach((element) => {
//       //   // let product = element.parentElement.parentElement;
//       //   console.log(element);
//       //     element.addEventListener("click", pushToCard())

//       // })
// // }

//funcion despues de cargar la pagina, para que se pueda ejecutar los botones de la compra
// window.onload = function addToCart() { 
//   console.log("hola")
//       let btnPurchase =  document.querySelectorAll('.add-item-btn');
//       console.log(btnPurchase)
//       btnPurchase.forEach((element) => {
//         // let product = element.parentElement.parentElement;
//         console.log(element);
//           element.addEventListener("click", pushToCard())

//       })
//         };
// ;



// function printToCart(printItem){
//   let tabla = document.querySelector('#card-item"')
//   const row = tabla.createElement('tr');
//   row.className = "product-item";
//   row.innerHTML = `
//       <td class="action">
//           <button class="btn btn-remove">Remove</button>
//       </td>
//       <td class="img-item">
//           <div class="img-box-table">
//               <img src="${printItem.image}"/>
//           </div>
//       </td>
//       <td class="name-item">
//       <span>${printItem.name}</span>
//       </td>
//       <td class="price-item">$<span>${printItem.price}</span></td>
//       <td class="quantity-item">
//       <input type="number" value="0" min="0"/>
//       </td>
//       <td class="subtotal">$<span>0</span></td>`
//       return printToCart;
// };


let counter = 0

//push to card button
function pushToCard(product){
  //counter ++
  //let cntshop = document.querySelector('.counterShop')
  //cntshop.innerHTML = counter
  // console.log(product.parentElement.parentElement)

  let divProd = product.parentElement.parentElement;
  // console.log(divProd)
  let prodName = divProd.querySelector('h2').textContent;
  // console.log(prodName)
  let prodPrice = divProd.querySelector('span').textContent;
  let prodImg = divProd.querySelector('img').src;
  // console.log(prodImg)

let prodObj = {
   name: prodName,
   price: prodPrice,
   img: prodImg
}

saveNewItem(prodObj)

// let infoNube = JSON.parse(localStorage.getItem("cart"))
// console.log(localStorage.getItem("cart"))
// console.log(JSON.parse(localStorage.getItem("cart")))
// console.log(infoNube)
// // console.log(infoNube.push(prodObj))
// localStorage.setItem("cart", JSON.stringify(infoNube.push(prodObj)));

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
      if(sortMethod === 'ascending price'){
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



  // async function allProducts(prod){
  //    if(prod !== undefined){
  //     prod = prod.textContent;
  //   }
  //   let items = await getApi()
  //   let text = "";
  //   let allProd = printProduct(prod)
  //   text += printProduct(prod)
  //   const div = document.getElementById('productos')
  //   div.innerHTML = text 
  // }
  // allProducts()

// async function sortBy(){
//   let pricesNum = await getApi()
//   let pricesOnly = pricesNum.map(function (pricesArr){
//     printProduct(pricesArr)
//   });    

//   pricesOnly.sort((a, b) => a - b)

//   const div = document.getElementById('productos')
//   div.innerHTML = pricesOnly
// }

// sortBy()
  
  // 

  //añadir url html en la img.


// pasarle la funcion a la otra pagina
// metodo find buscar por id en una ventada emergente


//hacer otra llamada y encontrarlo por id







// function active(btn){
//   console.log(btn)
//   if(btn.getAttribute('class') === 'filter-btn active'){
//     btn.setAttribute('class', 'filter-btn')
// } else{
//     btn.setAttribute('class', 'filter-btn active')
// }

// }
// const asc = document.querySelector('#ascending')
// asc.addEventListener('click', active(asc))
// const des = document.querySelector('#descending')
// des.addEventListener('click', active(des))


// Add active class to the current button (highlight it)
// var btnContainer = document.getElementById("myBtnContainer");
// var btns = btnContainer.getElementsByClassName("filter-btn");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function(){

//     if(btns[i].getAttribute('class').includes('active')){
//         btns[i].setAttribute('class', 'filter-btn')
//     } else{
//         btns[i].setAttribute('class', 'filter-btn active')
//     }
    // var current = document.getElementsByClassName("active");
    // current[0].className = current[0].className.replace(" active", "");
    // this.className += " active";
//   });
// }