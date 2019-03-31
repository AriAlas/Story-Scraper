//dependencies
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


// Requiring data models
var db = require("../models");

module.exports = function(app){
    //Get route to scrape https://www.quotev.com/nonfiction/c/Short-Stories and save them in Database
    app.get("/", function(req, res){
        axios.get("https://www.quotev.com/nonfiction/c/Short-Stories").then(function(response){

        // initializing cheerio in $
        var $ = cheerio.load(response.data);
        // result object to be used in mongo
        
        
        // Grabbing data from DIV class=innerquiz
        $(".innerquiz").each(function(i, element){
            var result = {};

            // properties of results objects
            result.title = $(element).find("h1").text();
            result.link = $(element).find("a").attr("href");
            result.summary = $(element).find(".descr").text();

             // Creating Stories and saving them to MongoDB
        db.Story.create(result).then(function(dbStory){ 
            console.log(dbStory);
            
  
       
        // Catching errors
        }).then(function(){
            
            res.redirect("/index");
        });
    });
        // Send a message to myself or client
        
   
        });
      

        
    });

    //Get for retrieving all Stories from database
    app.get("/index", function(req, res){
        db.Story.find({}).then(function(story){
            res.render("index", {story:story})
        })
    });

    // //Get route for grabbing an specific story populated with it's comment
    app.get("/stories/:id", function(req, res){
        db.Story.findOne({_id : req.params.id}).populate("comment").then(function(response){
            res.json(response);
        }).catch(function(err){
            console.log(err);
        });

    });

    //POST for creating/updating a comment on a Story
    app.post("/stories/:id", function(req, res){
        db.Comment.create(req.body).then(function(dbComment){
            return db.Article.findOneAndUpdate({_id:req.params.id}, {comment: dbComment._id},{new:true})
        });
    });

};
