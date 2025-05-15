import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    // Set page title
    document.title = `SleepOutside | ${this.product.Name}`;
    
    // Get main elements
    const main = document.querySelector('main');
    const productDetail = main.querySelector('.product-detail');
    
    // Update product details
    productDetail.querySelector('h3').textContent = this.product.Brand.Name;
    productDetail.querySelector('h2').textContent = this.product.Name;
    
    // Update image
    const img = productDetail.querySelector('img');
    img.src = `../images/${this.product.Image}`;
    img.alt = this.product.Name;
    
    // Update price
    productDetail.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
    
    // Update color
    productDetail.querySelector('.product__color').textContent = this.product.Colors[0].ColorName;
    
    // Update description
    productDetail.querySelector('.product__description').textContent = this.product.Description;
    
    // Update add to cart button data-id
    productDetail.querySelector('#addToCart').dataset.id = this.product.Id;
  }
}