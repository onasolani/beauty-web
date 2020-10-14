window.onload = function(){
    //cart box
    const iconShopping = document.querySelector('.iconShopping');
    const cartCloseBtn = document.querySelector('.close-btn')
    const cartBox = document.querySelector('.cartBox');
    iconShopping.addEventListener("click", function(){
        cartBox.classList.add('active');
    });
    cartCloseBtn.addEventListener("click", function(){
        cartBox.classList.remove('active')
    });

    // //adding cartbox data in table
	// const cardBoxTable = cartBox.querySelector('table');
	// let tableData = '';
	// tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
	// if(JSON.parse(localStorage.getItem('items'))[0] === null){
	// 	tableData += '<tr><td colspan="5">No items found</td></tr>'
	// }else{
	// 	JSON.parse(localStorage.getItem('items')).map(data=>{
	// 		tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
	// 	});
	// }
	// cardBoxTable.innerHTML = tableData;
}