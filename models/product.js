const mongoose = require("mongoose"),
productSchema = new mongoose.Schema({
	name: {type:String, required: true},
	image: {type:String, required: true},
	description: {type:String, required: true},
	price: {type:Number, required: true}
});	

//Export out the products model 
module.exports = mongoose.model("product", productSchema);

