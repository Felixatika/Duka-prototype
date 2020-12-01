const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

let carts = document.querySelectorAll('.add-cart');
let products = [
  {
  name: 'Adidas shoes',
  tag: 'adidas',
  price: 2000,
  inCart:0
},
{
  name: 'Supreme shoes',
  tag: 'supreme',
  price: 3000,
  inCart:0
},
{
  name: 'Nike shoes',
  tag: 'nike',
  price: 3000,
  inCart:0
},
{
  name: 'football shoes',
  tag: 'supreme',
  price: 3000,
  inCart:0
}
]


for(let i=0; i< carts.length; i++){
  carts[i].addEventListener('click', () =>{
    cartNumbers(products[i]);
    totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);


  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;

  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

setItems(product);

}

function setItems(product){

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null){

    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
          [product.tag]: product
        }
    }

    cartItems[product.tag].inCart += 1;
  }else{
  
  product.inCart = 1;
  cartItems = {
    [product.tag]: product
  }
}

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
//console.log("The product price is", product.price);
let cartCost = localStorage.getItem("totalCost");
console.log("my cartcost is", cartCost);
console.log(typeof cartCost);
if(cartCost !=null){
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost",cartCost + product.price);

} else{
  localStorage.setItem("totalCost",product.price);
}

}
function displayCart(){
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".products");
let cartCost = localStorage.getItem("totalCost");

if(cartItems && productContainer){
  productContainer.innerHTML = '';
  Object.values(cartItems).map(item => {
    productContainer.innerHTML += `
    <div class="products">
    <i class="fas fa-times-circle icon"></i>
    <img src="./images/${item.tag}.jpg">
    <span>${item.name}</span>
    </div>

    <div class="price">${item.price}</div>

    <div class="quantity">
    <i class="fas fa-caret-left"></i>
    <span>${item.inCart}</span>
    <i class="fas fa-caret-right"></i>
        <span>${item.inCart}</span>

    </div>
    <div class="total">
    ${item.inCart * item.price}
    </div>
    `;

  });
  productContainer.innerHTML +=`
<div class="basketTotalContainer>
<h4 class="basketTotalTitle">
Basket Total
</h4>
<h4 class="basketTotal">
${cartCost}
</h4>

  `;
}
}

onLoadCartNumbers();
displayCart();
