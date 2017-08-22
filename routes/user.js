const express = require("express"),
	router = express.Router(),
	csrf = require("csurf"),
	passport = require("passport"),
	User = require("../models/user")

//MIDDLEWARE

//CSRF protection	
router.use(csrf());

// Needs to be logged in to access
function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/user/login");
	}
};

//Signed in user should not access login or signup routes
function notLoggedIn(req,res,next){
	if (!req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/user/profile");
	}
};

//SIGN UP
router.get("/signup", notLoggedIn, function(req,res){
	res.render("user/signup", {csrfToken: req.csrfToken()});
})

//Post new user
router.post("/signup", notLoggedIn, function(req,res){
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

//PROFILE
router.get("/profile", isLoggedIn, function(req,res){
	res.render("user/dashboard");
});

//LOG IN
router.get("/login", notLoggedIn, function(req,res){
	res.render("user/login", {csrfToken: req.csrfToken()})
});

router.post("/login", notLoggedIn, passport.authenticate("local", {
	successRedirect: "profile",
	failureRedirect: "login",
	failureFlash: true
}));

//LOG OUT
router.get("/logout", isLoggedIn, function(req,res){
	req.logout();
	res.redirect("/shop");
})

module.exports = router