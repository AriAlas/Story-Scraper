// Dependencies
var express = requier("express");
var app = express();
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.port || 9696;



// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Morgan logger for logging requests
app.use(logger("dev"));

// Parse app body as JSON
app.use(express.urlencoded({extended : true}));
app.use(express.json());


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connection to MongoDb
mongoose.connect("mongodb://localhost/StoryScraper", {useNewUrlParser: true});

// Import routes
require("./routes/stories");

// Server begins listening
app.listen(PORT, function(){
    console.log("listening on port: " + PORT);
});