// LocalStorage functions
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
}

export function setLocalStorage(key, data) {
  let items = getLocalStorage(key);
  if (!Array.isArray(items)) items = [];
  items.push(data);
  localStorage.setItem(key, JSON.stringify(items));
}

// URL parameter function
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Template functions
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path}`);
  return await res.text();
}

export async function loadHeaderFooter() {
  const [header, footer] = await Promise.all([
    loadTemplate('/partials/header.html'),
    loadTemplate('/partials/footer.html')
  ]);
  
  const headerEl = document.getElementById('main-header');
  const footerEl = document.getElementById('main-footer');
  
  if (headerEl) renderWithTemplate(header, headerEl, null, updateCartCount);
  if (footerEl) renderWithTemplate(footer, footerEl);
}

function updateCartCount() {
  const count = getLocalStorage('so-cart').length;
  const countEl = document.querySelector('.cart-count');
  if (countEl) countEl.textContent = count || '';
}

// List rendering
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = '';
  const html = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, html);
}

export function addToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];
  
  // Check if product already exists in cart
  const existingItem = cartItems.find(item => item.Id === product.Id);
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cartItems.push({...product, quantity: 1});
  }
  
  setLocalStorage('so-cart', cartItems);
  
  // Optional: Show a notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = `${product.Name} added to cart!`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
  
  // Update cart count
  updateCartCount();
}