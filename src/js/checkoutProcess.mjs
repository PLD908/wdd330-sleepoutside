import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.services = new ExternalServices();
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.displayOrderTotals();
    
    // Calculate totals when zip changes
    document.getElementById('zip').addEventListener('blur', () => {
      this.calculateOrderTotal();
    });
    
    // Form submission
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkout(e.target);
    });
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
    document.querySelector(`${this.outputSelector} #subtotal`).textContent = `$${this.itemTotal.toFixed(2)}`;
    
    // Display cart items
    const itemsHtml = this.list.map(item => `
      <div class="cart-item">
        <p>${item.Name}</p>
        <p>$${item.FinalPrice}</p>
      </div>
    `).join('');
    document.getElementById('cartItems').innerHTML = itemsHtml;
  }

  calculateOrderTotal() {
    // Tax = 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    
    // Shipping = $10 + $2 per additional item
    this.shipping = 10 + (Math.max(0, this.list.length - 1) * 2);
    
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #orderTotal`).textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map(item => ({
      id: item.Id,
      name: item.Name,
      price: parseFloat(item.FinalPrice),
      quantity: 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    
    const order = {
      ...jsonData,
      orderDate: new Date().toISOString(),
      items: this.packageItems(),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };
    
    try {
      const response = await this.services.checkout(order);
      if (response.success) {
        localStorage.removeItem(this.key);
        window.location.href = '/checkout/success.html';
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err);
      alert('There was an error processing your order. Please try again.');
    }
  }
}