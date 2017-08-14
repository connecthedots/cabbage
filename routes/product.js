var express = require("express"),
	router = express.Router()

router.get("/", function(req,res){
	res.render("products/index");
})

module.exports = router