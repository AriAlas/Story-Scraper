//dependencies
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


// Requiring data models
var db = require("./models");


module.exports = function(app){
    //Get route to scrape https://www.quotev.com/nonfiction/c/Short-Stories and save them in Database
    app.get("/scrape", function(req, res){
        axios.get("https://www.quotev.com/nonfiction/c/Short-Stories").then(function(response){

        var $ = cheerio.load(response.data);

        $(".cardBox h1").each(function(i, element){

            var result = {};

            result.title = $(this).text();
            result.link = $(this).children("a").attr("href");
            result.summary = 


        });

        });
    });

    //Get for retrieving all Stories from database
    app.get("/stories", function(){});

    //Get route for grabbing an specific story populated with it's comment
    app.get("/stories/:id", function(){});

    //POST for creating/updating a comment on a Story
    app.post("/stories/:id", function(){});

};
