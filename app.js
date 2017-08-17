const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose= require("mongoose"),
	session = require("express-session"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	flash = require("connect-flash")

//Setting up express apps
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: "this is the secret key it goes meow",
				resave: false,
				saveUninitialized: false}))
app.use(flash()); //must go after session is initialized

//Passport auth
const User = require("./models/user");	
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//tells passport which field to use for serializing user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.error = req.flash("error");
	next();
})

//Database connection
mongoose.connect("localhost:27017/cabbage")

//ROUTES
const productRoutes = require("./routes/product.js"),
		userRoutes = require("./routes/user.js")

app.use("/shop", productRoutes);
app.use("/user", userRoutes);

//Root
app.get("/", function(req,res){
	res.render("index");
})

app.get("*", function(req,res){
	res.send("This page does not exist.")
})

//Server listening to requests
app.listen(3000, function(){
	console.log("Server is running")
})