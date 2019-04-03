//dependencies
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring data models
var db = require("../models");

module.exports = function(app){

    //Get for retrieving all Stories from database
    app.get("/index", function(req, res){
        db.Comment.find({}).then(function(comment){

            // console.log(story);
            res.render("index", {comment:comment})
        })
    });

};