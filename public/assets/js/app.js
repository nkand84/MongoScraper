$(document).ready(function () {
    $("#scrape-article").on("click", function (e) {
        e.preventDefault();
        $.getJSON("/articles", function (data) {
            displayResults(data);
        });


    });

    function displayResults(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var div = $("<div class='panel panel-default'>");
            var divHead = $("<div class='panel-heading'>");
            var divTitle = $("<h3 class='panel-title'>");
            var divBody = $("<div class='panel-body'>");
            divTitle.text(data[i].title);
            divBody.text(data[i].summary);
            divHead.append(divTitle);
            div.append(divHead);
            div.append(divBody);
            $("#scrape-content").append(div);
        }

    }
});

