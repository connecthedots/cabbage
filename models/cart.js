//Exports constructor function, creates shopping cart object
module.exports = function Cart(priorBasket){
	this.basket = priorBasket;
	this.totalQty = 0;
	this.totalPrice = 0;

	//if cart already exists, use the prior quantity & price
	//quick way to check if cart is empty, consider refactoring
	if (Object.keys(priorBasket).length !==0) {
        for (var key in priorBasket) {
            this.totalQty += priorBasket[key].aggQuantity;
            this.totalPrice += priorBasket[key].aggPrice;
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

	this.reduce = function(productId){
		if (!this.basket[productId]){
			throw "Error! Shopping cart does not contain item with the specified id";
		} else {
			var aggItem = this.basket[productId];
			aggItem.aggQuantity--;
			aggItem.aggPrice -= aggItem.productModel.price;
			this.totalQty--;
			this.totalPrice -= aggItem.productModel.price;
			//remove item group when quantity is 0
			if (aggItem.aggQuantity <= 0){
				delete this.basket[productId];
			}
		}
	}

	this.delete = function(productId){
		if (!this.basket[productId]){
			throw "Error! Shopping cart does not contain item with the specified id";
		} else {
			this.totalQty -= this.basket[productId].aggQuantity
			this.totalPrice -= this.basket[productId].aggPrice
			delete this.basket[productId]
		}
	}

    this.makeArray = function() {
        var arr = [];
        for (var productId in this.basket) {
        	//push each aggregated product to array
            arr.push(this.basket[productId]);
        }
        return arr;
    };
};