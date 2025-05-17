import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list"); // Adjust selector based on your HTML
const productList = new ProductList("tents", dataSource, listElement);

productList.init();

import Alert from "./alert.js";

const alerts = new Alert();
alerts.showAlerts();