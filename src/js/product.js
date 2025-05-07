import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const cartItemsObject = {};

function addProductToCart(product) {
  if(localStorage.getItem("so-cart")){
    const parsedCart = JSON.parse(localStorage.getItem("so-cart") || {});
    Object.assign(cartItemsObject, parsedCart)
  }
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  const newId = product.Id;
  
  //Here is my thought process
  /**********************************************
 * In this function the product is being passed to addProductToCart as an argument
 * Instead i think need to pass in an object instead
 **********************************************/

  cartItemsObject[newId]= product;
  console.log(JSON.stringify(cartItemsObject,null,5))
  addProductToCart(cartItemsObject);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
