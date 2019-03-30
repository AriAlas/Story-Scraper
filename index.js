// Dependencies
var express = require("express");
var app = express();
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.port || 9696;
var path = require("path");




// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Morgan logger for logging requests
app.use(logger("dev"));

// Parse app body as JSON
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Set Handlebars.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Making public folder static
app.use(express.static("public"));

// Connection to MongoDb
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Import routes
require("./routes/stories")(app);

// Server begins listening
app.listen(PORT, function(){
    console.log("listening on port: " + PORT);
});