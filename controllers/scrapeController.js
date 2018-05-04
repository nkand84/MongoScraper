var express = require("express");
var path = require("path");
var app = express();
var router = express.Router();
var cheerio = require("cheerio");
var request = require("request");
var mongojs = require("mongojs");

var databaseUrl = "nyScrapper";
var collections = ["nyData"];
var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});


router.get("/all", function (req, res) {
    db.nyData.find({}, function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            res.json(data);
        }
    });
});

router.get("/scrapped", function (req, res) {
    request("https://www.nytimes.com/", function (err, response, html) {
       
        var $ = cheerio.load(html);
        $("h2.story-heading").each(function (i, element) {
            var title = $(element).text();
            var summary = $(element).next().next().text();
            db.nyData.insert({ title: title, summary:summary });
        });
        res.redirect("/all");
    });
});
module.exports = router;

