import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();
  displayOrderSummary();
  setupCheckoutForm();
});

function displayOrderSummary() {
  const cartItems = getLocalStorage('so-cart') || [];
  const summaryElement = document.querySelector('.order-summary');
  
  if (cartItems.length === 0) {
    summaryElement.innerHTML = `<p>Your cart is empty. <a href="/index.html">Continue shopping</a></p>`;
    document.querySelector('.checkout-form').style.display = 'none';
    return;
  }

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
  
  // Display items
  summaryElement.innerHTML = `
    <h3>Order Summary</h3>
    <ul class="checkout-items">
      ${cartItems.map(item => `
        <li class="checkout-item">
          <img src="/images/${item.Image}" alt="${item.Name}">
          <div>
            <h4>${item.Name}</h4>
            <p>$${item.FinalPrice}</p>
          </div>
        </li>
      `).join('')}
    </ul>
    <div class="checkout-total">
      <p>Total: <span>$${total.toFixed(2)}</span></p>
    </div>
  `;
}

function setupCheckoutForm() {
  const form = document.querySelector('.checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const order = {
      items: getLocalStorage('so-cart'),
      customer: Object.fromEntries(formData),
      date: new Date().toISOString()
    };

    // In a real app, you would send this to your backend
    console.log('Order submitted:', order);
    
    // Clear cart and redirect
    localStorage.removeItem('so-cart');
    window.location.href = '/checkout/success.html';
  });
}