import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    if (product.Id != "989CG")
        {
            if (product.Id != "880RT")
            {
                return `<li class="product-card">
                            <a href="?product=${product.Id}">
                              <img
                                src="${product.Image}"
                                alt="Image of ${product.Name}"
                              />
                              <h3 class="card__brand">${product.Brand.Name}</h3>
                              <h2 class="card__name">${product.NameWithoutBrand}</h2>
                              <p class="product-card__price">$${product.FinalPrice}</p>
                            </a>
                        </li>`
            }
        }
    }

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
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // use this new utility function instead of above code
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}

