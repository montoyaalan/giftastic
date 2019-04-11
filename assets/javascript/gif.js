// THIS IS THE CODE FOR MY GIF ASSIGNMENT 
// USED IN CLASS ACTIVITIES BUT WAS ALSO ABLE TO FIND TUTORIAL VIDEO FOR THIS SPECIFIC ASSIGNMENT. 
// USED STYLING FROM BOOTSTRAP BECAUSE THE CODING ITSELF TOOK FOREVER TO PIECE AND TIME IS PRECIOUS


// NEVER FORGET OTHERWISE CODE WILL NOT WORK 0
$(document).ready(function(){


    //MY INITIAL ARRAY OF DISNEY "TOPICS"
    var topics = ["The Lion King", "Lizzie McGuire", "Mulan","Goofy",
    "Even Stevens","The Emperor's New Groove","Toy Story","Hannah Montana",
    "Aladdin","That's So Raven","Zenon","High School Musical","Frozen",
    "Selena Gomez","Recess","Ducktales","Minnie Mouse"];

    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        //SETTING THE LIMIT OF HOW MANY GIPHYS CAN BE RETURNED 
        var limitGif = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limitGif + "&api_key=DaLLU3tL0xCrlpsKU7voLIZbK8gPOAkh";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limitGif; j++) {    

                var displayDiv = $("<div>");
                //CREATING A CLASS CALLED "HOLDER" FOR CSS
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

//CALLING THE RENDER BUTTON TO DISPLAY THE INITIAL LIST OF TOPICS AS WELL AS 
 // - ADD THE NEW INPUT FROM THE USER AND MAKE IT INTO A BUTTON 
    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < topics.length; i++){
// ADDING THE USERS INPUT TO THE TOPICS ARRAY
// SHOWING IT IN THE HTML FILE IN BUTTONS VIA JQUERY AND DOM MANIPULATION 
            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            // ADDING THE TEXT FROM THE USER INPUT INTO THE BUTTON INTO TOPICS ARRAY 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});