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
  let productString = `<div class="productosolo"><div class="img-prod"><img src="${dato.imagen}"/></div><h2>${dato.name} </h2><p>$ ${dato.price}</p></div>`;
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
    }).sort((a,b) => {
      if(sortMethod === 'ascending price'){
        return b.price-a.price;

      } else{
        return a.price-b.price;
      }

    }).map(prod => {
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
        brandBox.innerHTML += `<button class="filters" onclick=getInfo(this, undefined)>${brand}</button>`;
      } 
    });
  }
  brandsButton()

// async function sortBy(){
//   let pricesNum = await getApi()
//   let pricesOnly = pricesNum.map(function (pricesArr){
//     return pricesArr.price;
//   });    
//   // console.log(pricesOnly)

//   pricesOnly.sort((a, b) => a - b)

//   const div = document.getElementById('productos')
//   div.innerHTML = pricesOnly
// }

// sortBy()
  
  // 

  //añadir url html en la img.

  /*datos.brand = button.innerHTML*/ 

// pasarle la funcion a la otra pagina
// metodo find buscar por id en una ventada emergente


//hacer otra llamada y encontrarlo por id