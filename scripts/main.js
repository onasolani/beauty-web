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

    return itemsArray
  }
  
function printProduct(dato){
  let productString = 
  `<div class="productosolo">
              <div class="singleProd">
                        <a href="#" target="_blank">
                                <div class="img-prod"><img src="${dato.imagen}"/></div>
                                <h2>${dato.name} </h2>
                        </a>
              </div>

              <div class="single-price">
                        <p>$ <span>${dato.price}</span></p>
                        
                        <button id="${dato.id}" class="add-item-btn">Add to cart</button>
                        
              </div>
              
  </div>`;

  //con un fine, encontrar el objeto
// console.log(dato)
  return productString
}

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

  
  async function idButtons(){
    let items = await getApi()
    let idBtnArr = [];
    items.forEach(function(idBtn){
      idBtnArr.push(idBtn.id)
    });
  }
  

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