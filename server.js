// require cheerio
var cheerio = require("cheerio");
// require request
var request = require("request");

// making a req to website you want to scrape
request("https://www.nytimes.com/", function (err, response, html) {
    // load html into cheerio and save as a variable
    var $ = cheerio.load(html);
    // an empty array to save the data we scrapped
    var results = [];
    // select the element
    $("h2.story-heading").each(function(i,element){
        // save the element text in variable title
        var title = $(element).text();
        // save the child 
        var link = $(element).children().attr("href");

        // push these results into an array
        results.push(
            {title : title,
             link : link
            }
        )
    });
    console.log(results);
});