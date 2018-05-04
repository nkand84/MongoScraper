var express = require("express");
var path = require("path");
var app = express();
var router = require("./controllers/htmlController");
var router1 = require("./controllers/scrapeController");
var bodyParser = require("body-parser");


var PORT = process.env.PORT || 3000;

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


app.use(router);
app.use(router1);







// Listen on port 3000
app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
});


