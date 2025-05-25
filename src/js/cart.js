import { numberOfCartItems } from "./cartItems";
import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-empty">
        <p>Your cart is empty</p>
        <p>Continue shopping <a href="../index.html">here</a></p>
      </li>
    `;

      // if cart is empty do not show the cart summery
        document.querySelector(".cart-total").innerHTML = "";
    return;
  }

   numberOfCartItems(); //Update number of cart-items superscript
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add event listeners to remove buttons
  document.querySelectorAll(".cart-card__remove").forEach((button, index) => {
    button.addEventListener("click", () => removeFromCart(index));
    
    // check the cart again to see if it is empty
    
    return;
    });
  
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-empty">
        <p>Your cart is empty</p>
        <p>Continue shopping <a href="../index.html">here</a></p>
      </li>
    `;

    // if cart is empty do not show the cart summery
    document.querySelector(".cart-total").innerHTML = "";
  }

  // Calculate and display cart total
  displayCartTotal(cartItems);
}
function displayCartTotal(cartItems) {

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.FinalPrice),
    0,
  );
  document.getElementById("cart-total-amount").textContent = total.toFixed(2);

}
function setupCheckoutListener() {
  const checkoutButton = document.getElementById("checkout-button");

  if (!checkoutButton) {
    console.error("Checkout button not found.");
    return;
  }

  // Remove any previous listener before adding a fresh one
  checkoutButton.removeEventListener("click", handleCheckoutClick);
  checkoutButton.addEventListener("click", handleCheckoutClick);
}

function handleCheckoutClick() {
  alert("Checkout functionality would go here!");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <div class="cart-card__details">
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="cart-card__remove">Remove</button>
    </div>
  </li>`;

  return newItem;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

// Initialize the cart display when the page loads and set up the checkout button event listener
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  setupCheckoutListener(); // Set up listener once
});