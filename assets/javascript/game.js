$( document ).ready(function() {

// my array
var topic = ["Pit Bull", "German Shepperd", "Chihuahua", "Beagle", "Bulldog", 
"Poodle", "Labrador Retriever","Golden Retriever"];

//function that displays the gif buttons

function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < topic.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("dog");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", topic[i]);
		gifButton.text(topic[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

//function to add new button

function addNewButton() {
	$("#addGif").on("click", function() {
		var dog = $("#topicInput").val().trim();
		if (dog == ""){
			return false;//no blank buttons
		}
		topic.push(dog);

		displayGifButtons();
		return false;
		});
}

//function to remove last button
function removeLastButton() {
	$("removeGif").on("click", function() {
		topic.pop(dog);
		displayGifButtons();
		return false;
	});

}

// function that displays the gifs

function displayGifs() {
	var dog = $(this).attr("data-name");
	 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=ukkx24OWmPYhPT2rwS3QOAHG5FvCE9gV&limit=8";
	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	// ukkx24OWmPYhPT2rwS3QOAHG5FvCE9gV
	.done(function(response) {
		$("#gifsView").empty();
		//show results of gifs
		var results = response.data;
		if (results == ""){
			alert("There is not a giffy for this!");	
		}
		for (var i = 0; i<results.length; i++){
			//put gifs in a div
			var gifDiv = $("<div1>");
			//pull rating of gif
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			//pull gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			//paused images
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			//animated images
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			//how images come in, already paused
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			//add new div to existing divs
			$("#gifsView").prepend(gifDiv);
		}
	});
}


//list of already created dogs
displayGifButtons();
addNewButton();
removeLastButton();



//event listeners
$(document).on("click", ".dog", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});