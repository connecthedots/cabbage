const express = require("express"),
	router = express.Router(),
	csrf = require("csurf"),
	passport = require("passport"),
	User = require("../models/user")

//Middleware for CSRF protection	
router.use(csrf());

//New user sign up page
router.get("/signup", function(req,res){

	res.render("user/signup", {csrfToken: req.csrfToken()});
})

//Post new user
router.post("/signup", function(req,res){
	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username
	});
	User.register(newUser,req.body.password, function(err, createdUser){
		if (err){
            req.flash("error", err.message);
            console.log(err.message)
            return res.redirect("/");			
		}
		//If no error, authenticate and log in the user
        passport.authenticate("local")(req,res,function(){
        	res.redirect("/user/profile")
        });
	});
});

router.get("/profile", function(req,res){
	res.render("user/dashboard");
});

module.exports = router