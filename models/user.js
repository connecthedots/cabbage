const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true}
})

//Adds passport local mongoose methods onto Schema
userSchema.plugin(passportLocalMongoose);

// passport.serializeUser(function(user, done){ //done is callback function which executes when done
// 	done(null, user.id) //serialize the user by id
// });

// passport.deserializeUser(function(id, done){
// 	done
// })

module.exports = mongoose.model("user", userSchema);