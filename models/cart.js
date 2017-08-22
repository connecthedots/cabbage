//Exports constructor function, creates shopping cart object
module.exports = function Cart(cartItems){
	this.cart = cartItems;
	this.totalQty = 0;
	this.totalPrice = 0;
	//each time we add an item, we take old version of shopping cart
	//look for the item in the shopping cart
	//if it's not in the cart, add it as a new item
	//if it's already in the cart, only increase the quantity of that item
	this.add = function(product, productId){
		var product = this.cart[productId];
		//Product not in current shopping cart
		if (!product){
			this.cart[productId] = {item: product, quantity: 0, price: 0} 
		}

	}
}