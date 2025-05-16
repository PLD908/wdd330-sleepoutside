
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  
  // Optional: Show a notification that the item was added to cart
  alert("Item added to cart!");
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
