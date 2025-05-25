import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from './utils.mjs';
import { numberOfCartItems } from "./cartItems.js";

loadHeaderFooter(numberOfCartItems);


const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list"); // Adjust selector based on your HTML
const productList = new ProductList("tents", dataSource, listElement);

productList.init();