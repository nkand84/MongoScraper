$(document).on("click", "#saved-articles", function (e) {
    e.preventDefault();
    console.log("ONCLICK")
    
    // Now make an ajax call for the Article
    $.getJSON("/save", function (data) {
        
        console.log("in app savedarticles")
        console.log(data);
        displaySavedResults(data);
        
        // window.location.href = "/savedarticles";
       
     });
    // get req to display all the artciles that have saved = true 
    //window.location.href = "/savedarticlesPage";

});
function displaySavedResults(data) {
    console.log(data);
    $("#saved-content").empty();
    for (var i = 0; i < data.length; i++) {
        
        var div = $("<div class='panel panel-default'>");
        var divHead = $("<div class='panel-heading'>");
        var divTitle = $("<h3 class='panel-title'>");
        var divBody = $("<div class='panel-body'>");
        divTitle.html(data[i].title + "&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-save btn-default' data-id='" + data[i]._id + "'" + "> Article Notes </button>");
        divBody.html(data[i].summary + "<br><br>" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>");
        divHead.append(divTitle);
        div.append(divHead);
        div.append(divBody);
        console.log("savedarticles")
        $("#saved-content").append(div);
           
        }
    }







