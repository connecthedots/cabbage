const express = require("express"),
	app = express(),
	bodyParser = require("body-parser")

//Setting up express
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}))

//ROUTES
const productRoutes = require("./routes/product.js");
app.use("/shop", productRoutes);

//Root Routes
app.get("/", function(req,res){
	res.render("index");
})
app.get("*", function(req,res){
	res.send("This page does not exist.")
})
app.listen(3000, function(){
	console.log("Server is running")
})