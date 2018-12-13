//Global Variables
//==============================================================================================================

var shows = ["Game of Thrones", "Community", "The Good Place", "Stranger Things", "30 Rock", "The Office"];

//Functions
//==============================================================================================================

function createButtons() {
    $("#button-bar").empty();

    for (var i=0; i<shows.length; i++) {
        var a = $("<button>");
        a.addClass("show");
        a.addClass("btn btn-secondary");
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("#button-bar").append(a);
    }
}


//Main Process
//==============================================================================================================

createButtons();

$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var newShow = $("#show-input").val().trim();
    
    shows.push(newShow);

    createButtons();

    $("#show-input").val("");
});

$(document).on("click", ".show", function() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=udV9kC7k1IUvAldjxaNtqlrYrpL3PSyf&limit=10&rating=pg";

    $("#gif-section").empty();
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(queryURL);
          console.log(response);

          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var showDiv = $("<div>");
            var p = $("<p>").html("<h7 id='rating-text'>Rating: " + results[i].rating + "</h7>");
            var showImage = $("<img>");

            showImage.attr("src", results[i].images.original_still.url);
            showImage.addClass("gif");
            showImage.attr("data-state", "still");
            showImage.attr("data-animate", results[i].images.original.url);
            showImage.attr("data-still", results[i].images.original_still.url);

            console.log($(showImage).attr("data-state"));
            console.log($(showImage).attr("data-animate"));
            console.log($(showImage).attr("data-still"));
            console.log($(showImage).attr("class"));

            showDiv.append(showImage);
            showDiv.append(p);
            $("#gif-section").prepend(showDiv);
          }
        });
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }

      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});