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

  setupQuickView(dataSource);
});

function setupQuickView(dataSource) {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.querySelector('.close-modal');
  
  // Close modal when clicking X
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close when clicking outside modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Handle quick view button clicks
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('quick-view-btn')) {
      const productId = e.target.dataset.id;
      showQuickView(productId, dataSource);
    }
  });
}

async function showQuickView(productId, dataSource) {
  const modal = document.getElementById('quickViewModal');
  const modalBody = document.querySelector('.modal-body');
  
  try {
    const product = await dataSource.findProductById(productId);
    
    modalBody.innerHTML = `
      <div class="quick-view-content">
        <div class="quick-view-image">
          <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
        </div>
        <div class="quick-view-details">
          <h3>${product.Brand.Name}</h3>
          <h2>${product.Name}</h2>
          <p class="price">$${product.FinalPrice}</p>
          <p class="color">${product.Colors[0].ColorName}</p>
          <p class="description">${product.Description}</p>
          <div class="quick-view-actions">
            <a href="/product_pages/?product=${product.Id}" class="view-details-btn">View Full Details</a>
            <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    
    // Handle add to cart in modal
    modalBody.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      // You'll need to implement this function
      addToCart(product);
      modal.style.display = 'none';
    });
    
    modal.style.display = 'block';
  } catch (error) {
    console.error('Error loading quick view:', error);
    modalBody.innerHTML = '<p>Error loading product details. Please try again.</p>';
    modal.style.display = 'block';
  }
}