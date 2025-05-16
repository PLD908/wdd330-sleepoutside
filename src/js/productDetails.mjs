





export default class productDetails{ //Tracks and establishes the product
    constructor(){ //This initialises the object providing the build template
        this.category = category; 
        this.path = `../json/${this.category}.json`;
        this.product = {};
    }

    init(){

    }

    addProductToCart(product) {
        setLocalStorage("so-cart", product);
        }
}