const productGrid = document.querySelector(".product-grid");
import { sortElements } from "./utilityFunctions/utilityfunctions.js";

//dynamically create the elements by getting the products from the server.

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
  priceTag.textContent = productObj.price;
  createdDiv.appendChild(priceTag);

  const btn = document.createElement('a');
  btn.textContent = "Add To Cart"
  btn.className = 'add-to-cart-btn';
  btn.productID = productObj.product_id;
  btn.productObj = productObj;
  btn.href = "#";
  createdDiv.appendChild(btn);

  const inputElement = document.createElement('input');
  inputElement.type = 'number';
  inputElement.min = 1;
  inputElement.defaultValue = 1;
  inputElement.max = productObj.quantity;
  inputElement.required = true;
  inputElement.addEventListener('keydown',(e)=>{
    if(e.keycode !== 38||e.keycode !==40){
      e.preventDefault();
    }
  })
  createdDiv.append(inputElement);

  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    //this is the base object, 
    //we add the quantity-to-purchase to implement cart functionality.
    const eventTarget = e.target.productObj;
    console.log(eventTarget);
    eventTarget.quantityToPurchase = (+inputElement.value)

    if(!localStorage.getItem('cart')){
      //there's nothing in the cart key. put first object inside. 
      localStorage.setItem('cart', JSON.stringify({
        cart: [eventTarget]
      }))
      console.log('first time insertion');
    } else {
      const cart = JSON.parse(localStorage.getItem('cart')).cart;
      const alreadyPresent = cart.findIndex((element)=>element.product_id == eventTarget.product_id)
      if(alreadyPresent >= 0){
        //already found in the cart.
        cart[alreadyPresent].quantityToPurchase +=  eventTarget.quantityToPurchase;
        localStorage.setItem('cart', JSON.stringify({
          cart
        }));
      }else {
        console.log('duplicate not found, pushing new object and seeing');
        cart.push(eventTarget);
        sortElements(cart);
        localStorage.setItem('cart', JSON.stringify({
          cart
        }));
      }
      console.log(JSON.parse(localStorage.getItem('cart')));
     /*
      cart.push(eventTarget);
      sortElements(cart);
      console.log(cart);
      localStorage.setItem('cart', JSON.stringify({
        cart
      }));
      */
      
    }
    //localStorage.clear();
    alert(`${eventTarget.product_name} added to the cart`)
  })

  productGrid.appendChild(createdDiv);
}

window.onload = async function(){
  console.log("home loaded")
  try{
    const response = await fetch('http://localhost:4000');
    const products = await response.json();
    console.log(products)
    for(const product of products.products){
      getElementsFromServer(product);
    }
  } catch(e){
    console.log(e.message)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', async function (e) {
      e.preventDefault();

      const productId = parseInt(this.getAttribute('data-id'));

      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        });

        const data = await res.json();
        alert(data.message);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    });
  });
});
