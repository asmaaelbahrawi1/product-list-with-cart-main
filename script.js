// Fetch data fron json
fetch('data.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));

let cart = []; //to store products selected 

// display products
function displayProducts(products)
{
    let productList = document.getElementById('product-list');
    productList.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
          <picture >
              <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
              <source media="(min-width: 768px)" srcset="${product.image.tablet}">
              <source media="(max-width: 480px)" srcset="${product.image.mobile}">
              <img src="${product.image.thumbnail}" alt="">
          </picture>
           
          <div class="quantity-controls" id="quantity-controls-${product.name.replace(/\s+/g, '-')}" style="display: none;">
              <button onclick="updateQuantity('${product.name}', -1)">–</button>
              <span id="quantity-${product.name.replace(/\s+/g, '-')}" class="quantity">0</span>
              <button onclick="updateQuantity('${product.name}', 1)">+</button>
          </div>
          
          <div class="add-item">
            <button class="addtocart" id="add-to-cart-${product.name.replace(/\s+/g, '-')}" onclick="addToCart('${product.name}', ${product.price}, this)">
            <img class="add-to-cart-img" src="assets/images/icon-add-to-cart.svg" alt="">
            <span>Add to Cart</span>
            </button>
          </div>

          <div class="product-info">
            <p class="categ">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="Price">$${product.price.toFixed(2)}</p>
          </div>
      `;
      productList.appendChild(productDiv);
  }
  

}

// add products to the cart
function addToCart(name, price, button) {
  let productDiv = button.closest('.product'); 
  let imgElement = productDiv.querySelector('img'); 
  let imageUrl = imgElement.src; 

  let cartItem = cart.find(item => item.name === name); 
  let controls = document.getElementById(`quantity-controls-${name.replace(/\s+/g, '-')}`);
  let quantityDisplay = document.getElementById(`quantity-${name.replace(/\s+/g, '-')}`);
  let emptyCartMessage = document.getElementById('empty-cart-message');

  if (cartItem) {  //هل تم اختيار المنتج قبل كدا او لا لو اه ف هنزود الكميه واحد ولو لا هنضيف منه واحد 
    cartItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1, image: imageUrl });
    productDiv.classList.add('selected'); // Add the selected class when the product is added
  }

  controls.style.display = 'flex';
  button.style.display = 'none'; 
  quantityDisplay.textContent = cartItem ? cartItem.quantity : 1; 

  emptyCartMessage.style.display = 'none';

  updateCart();
}

// update product quantity
function updateQuantity(name, change) {
  let cartItem = cart.find(item => item.name === name);
  let quantityDisplay = document.getElementById(`quantity-${name.replace(/\s+/g, '-')}`);

  if (cartItem) {
    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {
      cart = cart.filter(item => item.name !== name); 
      let controls = document.getElementById(`quantity-controls-${name.replace(/\s+/g, '-')}`);
      controls.style.display = 'none'; 
      
      let button = document.getElementById(`add-to-cart-${name.replace(/\s+/g, '-')}`);
      button.style.display = 'block'; 

      let productDiv = controls.closest('.product');
      productDiv.classList.remove('selected'); // Remove the selected class when the quantity reaches 0
    }

    quantityDisplay.textContent = cartItem.quantity;
  }

  updateCart();
}


// update cart display
function updateCart() {
  let cartItems = document.getElementById('cart-items');
  let cartCount = document.getElementById('cart-count');
  let cartTotal = document.getElementById('cart-total');
  let displayPrice = document.getElementById('displayprice');
  let emptyCartImg = document.getElementById('empty-cart-img');
  let carbon = document.getElementById('carbon');

  let confirmOrderBtn = document.getElementById('confirm-order-btn');
  let emptyCartMessage = document.getElementById('empty-cart-message'); 

  cartItems.innerHTML = ''; 
  let totalItems = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i]; // current item

    totalItems += item.quantity; 
    totalPrice += item.price * item.quantity; // total price

    let cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
        <div class="product-container">
            <p class="product-name">${item.name}</p>
            <div class="product-details">
                <p class="quan">${item.quantity}x</p>
                <p class="prices">
                    <span class="price-one">@ $${item.price}</span>
                    <span class="price-two">$${(item.price * item.quantity).toFixed(2)}</span>
                </p>
                <button onclick="removeFromCart('${item.name}')" class="delete-item">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
        </div>
    `;
    cartItems.appendChild(cartItemDiv); 
  }

  
  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toFixed(2);

  // hide  total and confirm button if cart  empty
  if (totalItems > 0) {
      displayPrice.style.display = 'flex';
      cartTotal.style.display = 'inline-block';
      confirmOrderBtn.style.display = 'block';
      emptyCartMessage.style.display = 'none'; 
      emptyCartImg.style.display='none';
      carbon.style.display='block';


  } else {
      displayPrice.style.display = 'none';
      cartTotal.style.display = 'none';
      confirmOrderBtn.style.display = 'none';
      emptyCartMessage.style.display = 'block'; 
      emptyCartImg.style.display='block';
      carbon.style.display='none';

  }
}

//  remove item from cart
function removeFromCart(name) {
  let productDiv = document.querySelector(`#quantity-controls-${name.replace(/\s+/g, '-')}`).closest('.product');
  productDiv.classList.remove('selected'); // Remove the selected class when the product is removed

  cart = cart.filter(item => item.name !== name);
  updateCart();
}

//   confirm order button
document.getElementById('confirm-order-btn').addEventListener('click', () => {
  let confirmationItems = document.getElementById('confirmation-items');
  let orderTotal = document.getElementById('order-total');
  let confirmationModal = document.getElementById('confirmation-modal');

  confirmationItems.innerHTML = ''; 
  let totalPrice = 0;

  // loop on cart and display the products in the confirmation 
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]; 
    let itemTotal = item.price * item.quantity; 
    totalPrice += itemTotal; 

    // creat div foe each item 
    let confirmationItemDiv = document.createElement('div');
    confirmationItemDiv.classList.add('confirmation-item');
    confirmationItemDiv.innerHTML = `
      <div class="confirmation-item-details">
        <img src="${item.image}" alt="${item.name}" class="confirmation-item-img" />
        <div class="confirmation-item-info">
          <p class="product-name">${item.name}</p>
          <div class="confirmation-price">
              <p class="quan">${item.quantity}x</p>
              <span class="price-one">@ $${item.price}</span>
          </div>
        </div>
        <div class="price-two-container"><p class="price-two">$${(item.price * item.quantity).toFixed(2)} </p></div>
      </div>
    `;

    confirmationItems.appendChild(confirmationItemDiv); 
}

  

  // Update the total price in the modal
  orderTotal.textContent = `$${totalPrice.toFixed(2)}`;

  // Show the confirmation modal
  confirmationModal.style.display = 'block';
});

// Event listener for Start New Order button
document.getElementById('new-order-btn').addEventListener('click', () => {
  cart = [];
  updateCart();
  
  // hide the confirmation modal and show the cart section again
  let confirmationModal = document.getElementById('confirmation-modal');
  confirmationModal.style.display = 'none'; // hide the modal
  document.getElementById('cart-section').style.display = 'block'; // Show the cart section again

  // reset all quantity controls and buttons to their original state
  let quantityControls = document.querySelectorAll('.quantity-controls');
  quantityControls.forEach(control => {
      control.style.display = 'none'; // Hide quantity controls
  });

  let addToCartButtons = document.querySelectorAll('[id^="add-to-cart-"]');
  addToCartButtons.forEach(button => {
      button.style.display = 'block'; 
  });


   // Remove the 'selected' class from all products
   let selectedProducts = document.querySelectorAll('.product.selected');
   selectedProducts.forEach(product => {
       product.classList.remove('selected'); // Remove the 'selected' class
   });
});

//  remove item from cart
function removeFromCart(name) {
  // remove the item from the cart
  cart = cart.filter(item => item.name !== name);
  
  // update the cart 
  updateCart();
  
  // Reset
  let controls = document.getElementById(`quantity-controls-${name.replace(/\s+/g, '-')}`);
  controls.style.display = 'none'; // Hide the quantity controls
  
  let button = document.getElementById(`add-to-cart-${name.replace(/\s+/g, '-')}`);
  button.style.display = 'block'; // Show the "Add to Cart" button again

  let productDiv = controls.closest('.product');
  productDiv.classList.remove('selected'); // Remove the selected class when the quantity reaches 0
}


















