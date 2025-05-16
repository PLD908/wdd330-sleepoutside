


import { setLocalStorage } from "./utils.mjs";


export default class productDetails{ //Tracks and establishes the product
    constructor(productId, dataSource){ //This initialises the object providing the build template
        this.productId = productId; 
        this.dataSource = dataSource
        this.product = {};
    }

    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this))
    }

    addProductToCart() {
        const cartItem = getLocalStorage("so cart") || [];
        cartItem.push(this.product)
        setLocalStorage("so-cart", cartItem);
    }

    renderProductDetails(){
        productDetailsTemplate(this.product);
    }

    productDetailsTemplate(){
        document.querySelector('h2').textContent = product.Brand.Name;
        document.querySelector('h3').textContent = product.NameWithoutBrand;

        const productImage = document.getElementById('productImage');
        productImage.src = product.Image;
        productImage.alt = product.NameWithoutBrand;

        document.getElementById('productPrice').textContent = product.FinalPrice;
        document.getElementById('productColor').textContent = product.Colors[0].ColorName;
        document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

        document.getElementById('addToCart').dataset.id = product.Id;
    }
}