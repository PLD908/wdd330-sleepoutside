import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();
  
  const category = getParam('category');
  const dataSource = new ProductData();
  const listElement = document.querySelector('.product-list');
  
  // Update category title
  const titleElement = document.querySelector('.category-title');
  if (titleElement) {
    titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
  
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
});