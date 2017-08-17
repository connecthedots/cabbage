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
	//Validate form info 
	req.checkBody("username", "Invalid email entered.").notEmpty().isEmail();
	req.checkBody("password", "Password should be at least 6 characters in length.").notEmpty().isLength({min:6});
	let valErrors = req.validationErrors();
	if (valErrors){
		let message = [];
		valErrors.forEach(function(error){
			message.push(error.msg)
		})
		req.flash("error", message)
		return res.redirect("signup")
	}
	//Construct user data object
	let newUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username
	};
	//hash password, add to User object, save in DB
	User.register(newUser, req.body.password, function(err, createdUser){
		if (err){
            req.flash("error", err.message);
            console.log(err.message)
            return res.redirect("signup");			
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

router.get("/login", function(req,res){
	res.render("user/login", {csrfToken: req.csrfToken()})
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "profile",
	failureRedirect: "login",
	failureFlash: true
}));

module.exports = router