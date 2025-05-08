import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const cartItemsArray = [];

function addProductToCart(product) {
  
  if(!localStorage.getItem("so-cart")){
    
    cartItemsArray.push(product);
    //const products = JSON.stringify(cartItemsArray)
  }else{
    cartItemsArray.push(product);
  }
  
  //console.log(cartItemsArray);
  setLocalStorage("so-cart", cartItemsArray);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  console.log(JSON.stringify(product, null, 3))
  //Here is my thought process
  /**********************************************
 * In this function the product is being passed to addProductToCart as an argument
 * Instead i think need to pass in an array of elements instead
 **********************************************/

  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
