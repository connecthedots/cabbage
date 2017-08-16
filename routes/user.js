const express = require("express"),
	router = express.Router(),
	csrf = require("csurf")

//Middleware for CSRF protection	
router.use(csrf());

//New user sign up page
router.get("/signup", function(req,res){
	res.render("user/signup", {csrfToken: req.csrfToken()});
})

//Post new user
router.post("/signup", function(req,res){
	let user = req.body.user
	let output = `Name: ${user.firstName}, email: ${user.email}` 
	res.send("New user: " + output)
})

module.exports = router