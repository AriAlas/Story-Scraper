//dependencies
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring data models
var db = require("../models");

module.exports = function(app){

    app.get("/comments", function(req, res){
        db.Comment.find({}).then(function(dbComment){
            console.log(dbComment);
            res.json(dbComment)
        });
    });

};