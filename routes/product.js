const express = require("express"),
	router = express.Router(),
	Products = require("../models/product")

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
	var productId = req.params.productId
	res.send("This route adds a product to the shopping cart with id: " + productId);
});

module.exports = router