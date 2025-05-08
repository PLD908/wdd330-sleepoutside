import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

  //Here is my thought process
  /**********************************************
 * In this function the product object is being passed to addProductToCart as an argument
 * Instead i think need to pass in an array of elements instead
 * But first check of so-cart exists , if not create an empty array
 * Then push product to that array 
 * Set array as value to the Local Storage.
 **********************************************/

function addProductToCart(product) {
  const products = JSON.parse(localStorage.getItem("so-cart")) || []; //Might need to learn this one a little bit more. change item from string to object and check if its in localstorage , else create append it to array names "products"
  products.push(product); //push the incoming product to products array.
  setLocalStorage("so-cart", products); //set the current to local storage with key "so-cart" and value (an array of objects)
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  //console.log(JSON.stringify(product, null, 3)) for testing 
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
