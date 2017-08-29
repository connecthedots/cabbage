const mongoose = require("mongoose")

var orderSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required:true},
	address: {type: Object, required: true},		
	cart: {type: Object, required: true},
	paymentId: {type: String, required:true}
});

module.exports = mongoose.model("Order", orderSchema);