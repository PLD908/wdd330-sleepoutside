


import { setLocalStorage } from "./utils.mjs";


export default class productDetails{ //Tracks and establishes the product
    constructor(productId, dataSource){ //This initialises the object providing the build template
        this.productId = productId; 
        this.dataSource = dataSource
        this.product = {};
    }

    init(){

    }

    addProductToCart(product) {
        setLocalStorage("so-cart", product);
    }

    renderProductDetails(){

    }
}