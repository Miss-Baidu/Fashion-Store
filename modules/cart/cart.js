const rootElement = document.querySelector('.product-grid');

const emptyCart = document.querySelector('#no-items-dialog');

const totalPriceElement = document.querySelector('#total-price')

const checkoutButton = document.querySelector('#checkout-button');
const checkoutCloseButton = document.querySelector('#close-btn');
const checkoutConfirmButton = document.querySelector('#checkout-confirm-button')
const checkoutModal = document.querySelector('.modal-container')
const checkoutModalText = document.querySelector('.modal > p')

function getElementsFromServer(productObj){
  const createdDiv = document.createElement('div')
  createdDiv.className = "product";
  
  const imageTag = document.createElement('img');
  console.log(productObj.img_src)
  imageTag.src = productObj.img_src; 
  createdDiv.appendChild(imageTag);

  const title = document.createElement('h3');
  title.textContent = productObj.product_name; 
  createdDiv.appendChild(title);

  const priceTag = document.createElement('p');
  priceTag.textContent = `Unit Price: ${productObj.price}`
  createdDiv.appendChild(priceTag);
  
  const quantity = document.createElement('p');
  quantity.textContent = `Quantity In Cart: ${productObj.quantityToPurchase}`
  createdDiv.appendChild(quantity);

  const subTotal = document.createElement('p');
  const subTotalAmount = (productObj.quantityToPurchase) * (+productObj.price);
  const subTotalWhole = (""+subTotalAmount).split('.')[0];
  const subTotalFractional = (""+subTotalAmount).split('.')[1].slice(0,2)
  subTotal.textContent = `Total: ${subTotalWhole}.${subTotalFractional} $`;
  createdDiv.appendChild(subTotal);
  
  rootElement.appendChild(createdDiv);
}

//read from localstorage and get the list of all the objects added to cart. 

window.onload = function(){
  const cartItemsStorage = JSON.parse(localStorage.getItem("cart"));
  if(!cartItemsStorage){
    emptyCart.style.display = "flex"
    return;
  }
  const cartItems = cartItemsStorage.cart;
  let total = 0;
  for(const cartItem of cartItems){
    console.log(cartItem);
    getElementsFromServer(cartItem);
    total += (+cartItem.price) * cartItem.quantityToPurchase
  } 
  const totalWhole = (""+total).split('.')[0];
  const totalFractional = (""+total).split('.')[1].slice(0,2)
  console.log();
  totalPriceElement.textContent = `${totalWhole}.${totalFractional}`;
}

checkoutConfirmButton.addEventListener('click', async()=>{
  checkoutModalText.textContent = "Checked out"
  const response = await fetch("http://localhost:4000/checkout", 
    { 
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: localStorage.getItem("cart") 
    });
  if(response.ok){
    //clear cart and go to the home directory. 
    console.log("okayyy");
    localStorage.removeItem("cart");
    window.location = "/fashion.html"
  }
})

checkoutButton.addEventListener('click', ()=>{
  checkoutModal.style.display = "flex"
})
checkoutCloseButton.addEventListener('click', ()=>{
  checkoutModal.style.display = "none";
})

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/cart');
    const cartItems = await response.json();

    const cartContainer = document.getElementById('cart-items');
    if (cartItems.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="100">
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
        `;
        cartContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
});

let cart = [];