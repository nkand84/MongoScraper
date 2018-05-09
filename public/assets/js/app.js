// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // displayResults(data, "index");
});

// scrape on click 
$(document).on("click", "#scrape-article", function (e) {
    e.preventDefault();
    $("h1").text("Mongo Scraper");
    $("h3").text("New York Times Edition");
    $.get("/scrape", function (data) {
        // console.log(data);
    });


});

// display results  
function displayResults(data, calledFrom) {
    // console.log(data);
    $("#scrape-content").empty();
    for (var i = 0; i < data.length; i++) {

        var div = $("<div class='panel panel-default' data-id='" + data[i]._id + "'>");
        var divHead = $("<div class='panel-heading'>");
        var divTitle = $("<h3 class='panel-title'>");
        var divBody = $("<div class='panel-body'>");
        if (calledFrom == "index") {
            divTitle.html(data[i].title + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-save btn-success' data-id='" + data[i]._id + "'" + "> Save Article</button>");
            divBody.html(data[i].summary + "<br><br>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>");
        }
        else if (calledFrom == "savedarticles") {
            divTitle.html(data[i].title + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-note btn-default' data-id='" + data[i]._id + "'" + "> Article Notes </button>" + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-delete btn-danger' data-id='" + data[i]._id + "'" + "> Delete</button>");
            divBody.html(data[i].summary + "<br><br>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>");
        }
        divHead.append(divTitle);
        div.append(divHead);
        div.append(divBody);

        if (calledFrom == "index") {
            $("#scrape-content").append(div);
        }
        else if (calledFrom == "savedarticles") {
            // console.log("savedarticles");
            $("#scrape-content").append(div);
        }
    }
}


// on click to save articles
$(document).on("click", ".btn-save", function (e) {
    e.preventDefault();
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/savearticles/" + thisId,
        data: { saved: true }
    }).then(function (data) {
        // Log the response
        console.log(data);
    });
});

$(document).on("click", "#saved-articles", function (e) {
    // e.preventDefault();
    // $("h1").text("Saved Articles");
    // $("h3").text("Your saved articles");
    // // Now make an ajax call for the Article
    // $.getJSON("/save", function (data) {
    //     console.log(data);
    //     // displayResults(data, "savedarticles");

    // });

});

$(document).on("click", ".btn-note", function (e) {
    console.log("clicked for notes");
    // e.preventDefault();
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            var div = $("<div id='note-content'>");
            // The title of the article
            div.append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            div.append("<input id='titleinput' class='form-control' name='title' ><br>");
            // A textarea to add a new note body
            div.append("<textarea id='bodyinput' class='form-control' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            div.append("<button data-id='" + data._id + "' id='savenote' class='btn btn-success'>Save Note</button>");
            $("#notes").append(div);
            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }

        });


});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("in saved note app")
    console.log(thisId)
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log("nishanth")
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});


$(document).on("click", ".btn-delete", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/articles/",
        data: {id: thisId} 
    }).then(function (data) {
           console.log(data);
        });
   location.reload(true);
});