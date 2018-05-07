$(document).on("click", "#scrape-article", function (e) {
    e.preventDefault();
    $("h1").text("Mongo Scraper");
    $("h3").text("New York Times Edition");
    $.getJSON("/articles", function (data) {
        displayResults(data,"index");
    });


});


function displayResults(data,calledFrom) {
    // console.log(data);
    $("#scrape-content").empty();
    for (var i = 0; i < data.length; i++) {
        
        var div = $("<div class='panel panel-default'>");
        var divHead = $("<div class='panel-heading'>");
        var divTitle = $("<h3 class='panel-title'>");
        var divBody = $("<div class='panel-body'>");
        if (calledFrom == "index") {
            divTitle.html(data[i].title + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-save btn-default' data-id='" + data[i]._id + "'" + "> Save Article</button>");
            divBody.html(data[i].summary + "<br><br>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>");
        }
        else if  (calledFrom == "savedarticles") {
            divTitle.html(data[i].title + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-save btn-default' data-id='" + data[i]._id + "'" + "> Article Notes </button>");
            divBody.html(data[i].summary + "<br><br>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>");
        }
        divHead.append(divTitle);
        div.append(divHead);
        div.append(divBody);

        if (calledFrom == "index") {
            $("#scrape-content").append(div);
        }
        else if(calledFrom == "savedarticles") {
            console.log("savedarticles")
            // $("#saved").append(div);
            $("#scrape-content").append(div);
        }
    }
}


// on click to save articles
$(document).on("click", ".btn-save", function (e) {
    e.preventDefault();
    var thisId = $(this).attr("data-id");
    // console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: { saved: true }
    }).then(function (data) {
        // Log the response
    });
});

$(document).on("click", "#saved-articles", function (e) {
    e.preventDefault();
    $("h1").text("Saved Articles");
    $("h3").text("Your saved articles");
    // Now make an ajax call for the Article
    $.getJSON("/save", function (data) {
        console.log("in app savedarticles")
        console.log(data);
        displayResults(data,"savedarticles");

    });
    // get req to display all the artciles that have saved = true 

});




