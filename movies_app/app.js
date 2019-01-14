var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req , res){
	res.send("You're on the root page, and apparently, ubuntu node is working properly");
});



app.listen(3000, function(){
	console.log("We got our backend running, partner!");
});