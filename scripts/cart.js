window.onload = function(){
    //cart box
    const iconShopping = document.querySelector('.iconShopping');
    const cartCloseBtn = document.querySelector('.close-btn')
    const cartBox = document.querySelector('.cartBox');
    printCart()
    iconShopping.addEventListener("click", function(){
        cartBox.classList.add('active');
    });
    cartCloseBtn.addEventListener("click", function(){
        cartBox.classList.remove('active')
    });
    console.log("estamos imprimiendo")
}