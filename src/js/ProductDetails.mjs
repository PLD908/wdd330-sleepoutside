import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { numberOfCartItems } from './cartItems.js';


const baseURL = import.meta.env.VITE_SERVER_URL

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    await new Promise(resolve => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      }
    });

    console.log('Initializing ProductDetails for productId:', this.productId);

    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error('Product not found for ID:', this.productId);
        return;
      }
      console.log('Fetched product:', this.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return;
    }

    this.renderProductDetails();

    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
      console.log('Event listener attached to Add to Cart button');
    } else {
      console.error('Add to Cart button not found in the DOM');
    }
  }

    addProductToCart() {
    if (!this.product || !this.product.Id) {
      console.error('No valid product data available to add to cart:', this.product);
      return;
    }
    if (!this.product.quantity) this.product.quantity = 1;
  
    // Get current cart or start a new one
    let cart = getLocalStorage('so-cart') || [];
    // Check if product already in cart
    const existing = cart.find(item => item.Id === this.product.Id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({...this.product});
    }
    setLocalStorage('so-cart', cart);
    numberOfCartItems();
    alert('Item added to cart!');
    console.log('Cart updated in localStorage:', cart);
  }

  renderProductDetails() {
      document.querySelector('.card__brand').textContent = this.product.Brand?.Name || '';
      document.querySelector('.card__name').textContent = this.product.NameWithoutBrand || '';
      document.querySelector('.product-detail img').src = this.product.Images?.PrimaryLarge || '';
      document.querySelector('.product-detail img').alt = this.product.Name || '';
      document.querySelector('.product-card__price').textContent = `$${this.product.ListPrice || '0.00'}`;
      document.querySelector('.product__color').textContent = this.product.Colors?.[0]?.ColorName || '';
      document.querySelector('.product__description').textContent = this.product.DescriptionHtmlSimple?.replace(/<[^>]+>/g, '') || '';

    if (nameElement) nameElement.textContent = this.product.Name || 'Unknown Product';
    if (imageElement) imageElement.src = this.product.Images.PrimaryLarge || '';
    if (priceElement) priceElement.textContent = `$${this.product.ListPrice || '0.00'}`;
    if (descriptionElement) {
      // Strip HTML tags and set plain text
      const plainText = this.product.DescriptionHtmlSimple.replace(/<[^>]+>/g, '');
      descriptionElement.textContent = plainText || 'No description available';
    }
    if (colorElement) colorElement.textContent = this.product.Colors?.[0]?.ColorName || '';
  }
}