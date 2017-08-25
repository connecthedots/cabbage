const express = require("express"),
	router = express.Router(),
	Products = require("../models/product"),
	Cart = require("../models/cart")

//Seeding in sample data to db
Products.remove({}, function(err, reply){
	if (err){
		console.log("Error clearing products from db");
		console.log(err)
	} else {
		console.log("Successfully wiped db");
	}
});
Products.create({
	name: "Red Cabbage",
	image: "assets/redkraut.jpg",
	description: "Vibrant and slightly sweet flavor",
	price: 9.95
	},
	{
	name: "Savoy Cabbage",
	image: "assets/savoykraut1.jpg",
	description: "Extra texture and tart",
	price: 8.95
	},
	{
	name: "Green Cabbage",
	image: "assets/greenkraut.jpg",
	description: "Classic, refreshing and tasty!",
	price: 6.95
	},	
	{
	name: "Sauerkraut Set",
	image: "assets/kraut1.jpg",
	description: "Get the whole set and try all the favorites",
	price: 19.95
	},
);

//ROUTES
router.get("/", function(req,res){
	Products.find({}, function(err, products){
		if (err){
			console.log(err);
		} else {
			res.render("products/index", {products: products});
		}
	});
});

router.get("/add/:productId", function(req, res){
	var productId = req.params.productId;
	Products.findById(productId, function(err, product){
		if (err){
			console.log(err);
			res.redirect("/shop");
		} else {
			//checks if there is a cart in sessions already,
				//If yes, set the basket of the previous cart as starting basket
				//If not, assign empty object as starting basket
			var createdCart = new Cart(req.session.cart ? req.session.cart.basket : {});
			//add the product to cart
			createdCart.add(product, product._id);
			//save cart to session
			req.session.cart = createdCart;
			console.log("New cart created, and product added");
			console.log(req.session.cart);
			res.redirect("/shop");
		}
	});
});

router.get("/cart", function(req,res){
	//check if cart exists
	if (!req.session.cart){
		return res.render("cart/viewCart", {cart: null});
	}
	//retrieve the methods on Cart obj
	let cart = new Cart(req.session.cart.basket);
	res.render("cart/viewCart", {cart: cart.makeArray()});
});

router.get("/checkout", function(req,res){
	if (!req.session.cart){
		return res.redirect("/cart");
	}
	res.render("cart/checkout", {totalPrice: req.session.cart.totalPrice})
});

router.post("/checkout", function(req,res){
	if (!req.session.cart){
		return res.redirect("/cart");
	}
	res.send("This is the Post page for check outs. SHOW ORDER CONFIRMATION HERE")
});


module.exports = router