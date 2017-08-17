const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true}
})

//Adds passport local mongoose methods onto Schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);