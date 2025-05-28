import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    this.listElement.innerHTML = '';
    renderListWithTemplate(
      this.productCardTemplate,
      this.listElement,
      list.filter(item => this.category ? item.Category.Name === this.category : true)
    );
  }

  productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="/images/${product.Image}" 
             alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>`;
  }
}