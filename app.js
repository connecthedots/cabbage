const express = require("express"),
	app = express(),
	bodyParser = require("body-parser")

//Setting up express
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
	res.render("index");
})

app.get("/index", function(req, res){
	res.send("This is where the saurkraut products will be")
})

app.listen(3000, function(){
	console.log("Server is running")
})