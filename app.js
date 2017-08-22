const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose= require("mongoose"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	flash = require("connect-flash"),
	validator = require("express-validator")

//Setting up express apps
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator()); //must go after body parser since it uses body content 
app.use(session({secret: "this is the secret key it goes meow",
				resave: false,
				saveUninitialized: false,
				store: new MongoStore({mongooseConnection: mongoose.connection}), 
				cookie: {maxAge: 10 * 60 *1000} //How long the session lasts on cookie (in ms)
			})
);
app.use(flash()); //must go after session is initialized

//Passport auth
const User = require("./models/user");	
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//tells passport which field to use for serializing user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passing local variables to view templates
app.use(function(req,res,next){
	//To pass in connect-flash messages
	res.locals.errors = req.flash("error");
	//To check user object 
	res.locals.user = req.user;
	res.locals.session = req.session;
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