//Exports constructor function, creates shopping cart object
module.exports = function Cart(cartItems){
	this.basket = cartItems;
	this.totalQty = 0;
	this.totalPrice = 0;

	//quick way to check if cart is empty
	console.log(Object.keys(cartItems).length !==0)
	if (Object.keys(cartItems).length !==0) {
        for (var key in cartItems) {
            this.totalQty += cartItems[key].aggQuantity;
            this.totalPrice += cartItems[key].aggPrice;
            console.log("==========" + this.totalQty)
            console.log("==========" + this.totalPrice)
        }
    }
	//each time we add a product, we take previous version of shopping cart
	//look for the item in the shopping cart
	//if it's not in the cart, add it as a new item
	//if it's already in the cart, only increase the quantity of that item
	this.add = function(product, productId){
		//aggItem is the aggregate of units stored for this product
		var aggItem = this.basket[productId]
		//Product not in current shopping cart
		if (!this.basket[productId]){
			this.basket[productId] = {"productModel": product, "aggQuantity": 0, "aggPrice": 0} 
		}
		this.basket[productId].aggQuantity++;
		this.basket[productId].aggPrice = this.basket[productId].productModel.price * this.basket[productId].aggQuantity;
		this.totalQty++;
		this.totalPrice += this.basket[productId].productModel.price;

	}

    this.makeArray = function() {
        var arr = [];
        for (var id in this.basket) {
        	//push each aggregated product to array
            arr.push(this.basket[productId]);
        }
        return arr;
    };
};