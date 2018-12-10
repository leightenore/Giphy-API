//Global Variables
//==============================================================================================================

var shows = ["Game of Thrones", "Community", "The Good Place", "Stranger Things", "Parks and Recreation"];

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
  });

$(".show").on("click", function() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=udV9kC7k1IUvAldjxaNtqlrYrpL3PSyf&limit=10&rating=pg";

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
            var p = $("<p>").text("Rating: " + results[i].rating);
            var showImage = $("<img>");

            showImage.attr("src", results[i].images.fixed_height.url);

            showDiv.append(p);
            showDiv.append(showImage);
            $("#gif-section").prepend(showDiv);
          }
        });
});