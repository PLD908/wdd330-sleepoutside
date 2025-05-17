import { getLocalStorage } from "./utils.mjs";

export function numberOfCartItems() {
  //Adds number of items in cart (superscript)
  const cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    document.querySelector(".numOfCartItems").innerHTML = cartItems.length;
  }
}

document.addEventListener("DOMContentLoaded", numberOfCartItems);
