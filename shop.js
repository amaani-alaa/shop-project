let cartshop = document.querySelectorAll('.cartshop');
let products =[
    {
        name: 'grey top',
        tag: 'grey top',
        price:15,
        inCart:0
    },
    {
        name: 'black top',
        tag: 'black top',
        price:14,
        inCart:0
    },
    {
        name: 'grey top',
        tag: 'grey top',
        price:15,
        inCart:0
    },
    {
        name: 'grey top',
        tag: 'grey top',
        price:15,
        inCart:0
    }
];
for (let i=0; i < cartshop.length; i++){
    cartshop[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    })
}


function onLoadCartNumbers(){

    let productNumber = localStorage.getItem('cartNumbers');

    if( productNumber ) {
        document.querySelector('.cart span').textContent = productNumber;
    }
}


function cartNumbers(product){
    let productNumber = localStorage.getItem('cartNumbers');
    
    productNumber = parseInt(productNumber);
    if( productNumber ) {
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;

    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems ={
            [product.tag]: product
        }

    }
   
     
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));

}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cart is",cartCost);
    console.log(typeof cartCost); 
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
    draw();
}
onLoadCartNumbers();



// search 
let serch = document.querySelector('#searchicon');
let close = document.querySelector('#removebtn');
let SerchBTn = document.querySelector('#searchbtn');



serch.addEventListener("click", srch);
function srch(){
    document.querySelector(".backgroundsearch").classList.add("active");
}


close.addEventListener("click", clo);

function clo(){
    document.querySelector(".backgroundsearch").classList.remove("active");
}

SerchBTn.addEventListener("click", ser);

function ser(){
    location.href='search.html';
}



//responsive 
const cloose =document.getElementById('cloose');
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
 
if(bar){
    bar.addEventListener('click', ()=> {
        nav.classList.add('active');
    })
}
 
if(cloose){
    cloose.addEventListener('click', ()=> {
        nav.classList.remove('active');
    })
}

//cart 
let cartIcon = document.querySelector('#cartbg2');
let cartAll = document.querySelector('.cartpage');
let cartClose = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
    cartAll.classList.add("active");
};
cartClose.onclick = () =>{
    cartAll.classList.remove("active");
};


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName("iconremovecart");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantitybg");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cartpg');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }


} 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;

    }
    updatetotal();
}
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("cart-titlebg")[0].innerText
    console.log(title);

}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-pricebg")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantitybg")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
        document.getElementsByClassName('total-price2')[0].innerText = "$" + total;
    }
}

    


