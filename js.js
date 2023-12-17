// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open cart
cartIcon.onclick = ()=> {
    cart.classList.add("active");
};
// close cart
closeCart.onclick = ()=> {
    cart.classList.remove("active");
};

// cart working js
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}

// making function 
function ready(){
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i=0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    // buy button work
    document
            .getElementsByClassName("btn-buy")[0]
            .addEventListener("click",buyButtonClicked);
}
// buy Button 
function buyButtonClicked(){
    alert("your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    Updatetotal();
}
function removeCartItem(event){
    var buttonClicked = event.target 
    buttonClicked.parentElement.remove();
    Updatetotal();
}
//  Quantity Charged
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    } 
    Updatetotal();
}
// Add to Cart
function addCartClicked(event){
    var button = event.target ;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    Updatetotal();
}
function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
     cartShopBox.classList.add("cart-box");
    var CartItems = document.getElementsByClassName("cart-content")[0];
    var CartItemsNames = CartItems.getElementsByClassName("cart-product-title");
    for (var i=0; i< CartItemsNames.length; i++){
        alert("You have already add this item to cart");
        return;
    }
}
var cartBoxContent =` <img src="${productImg}" alt="" class="cart-img">
                     <div class="detail-box">
                         <div class="cart-product-title">${productTitle}</div>
                         <div class="cart-price">${productPrice}</div>
                         <input type="number" value="1" class="cart-quantity">
                     </div>
                    // Remove Cart
                    <i class='bx bxs-trash-alt cart-remove' ></i>`;   
  cartShopBox.innerHTML = cartBoxContent ;
  CartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
  // difini product img
  var productImg = "path/to/your/image.jpg";
  var productTitle = "Title product";
  var productPrice = "$1000";
  addProductToCart(productImg,productPrice,productTitle)
// Update Total 
function Updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value ;
        var price = parseFloat(priceElement.innerText.replace('$',""));
        total = total + (price * quantity);}
        // if Price container some cents value
        total = Math.round(total*100)/100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total ;
    
}