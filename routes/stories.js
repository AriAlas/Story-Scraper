//dependencies
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


// Requiring data models
var db = require("../models");

module.exports = function(app){
    //Get route to scrape https://www.quotev.com/nonfiction/c/Short-Stories and save them in Database
    app.get("/scrape", function(req, res){
        axios.get("https://www.brainyquote.com/lists/authors/top_10_oscar_wilde_quotes").then(function(response){

        // initializing cheerio in $
        var $ = cheerio.load(response.data);
        // result object to be used in mongo
        
        
        // Grabbing data from DIV class=innerquiz
        $(".quoteContent").each(function(i, element){
            var result = {};

            // properties of results objects
            
            result.link = $(element).find("a").attr("href");
            result.quote = $(element).find("p").text();
            console.log(result);

             // Creating Stories and saving them to MongoDB
             
        db.Story.create(result).then(function(dbStory){ 
            console.log(dbStory);
      
    }).catch(function(err){
        console.log(err);
    });
   
    });
    res.redirect("/");
});
   
});

    //Get for retrieving all Stories from database
    app.get("/", function(req, res){
        db.Story.find({}).populate("comment").then(function(story){

            // console.log(story);
            res.render("index", {story:story})
        })
    });


     // //Get route for grabbing an specific story populated with it's commentS
     app.get("/stories/:id", function(req, res){
        db.Story.findOne({_id : req.params.id}).populate("comment").then(function(response){
            res.json(response);
        }).catch(function(err){
            console.log(err);
        });

    });
     //POST for creating a comment on a Story
     app.post("/stories/:id", function(req, res){
        db.Comment.create(req.body).then(function(dbComment){
            // console.log(req.body);
            return db.Story.findOneAndUpdate({_id:req.params.id},{$push:{comment: dbComment._id, author: dbComment.author, body:dbComment.body}},{new:true, upsert: true});
            // console.log(dbComment);
            
        }).then(function(dbStory){
            res.json(dbStory);
        });
        
    });

};
