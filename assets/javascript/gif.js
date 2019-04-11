// THIS IS THE CODE FOR MY GIF ASSIGNMENT 
// USED IN CLASS ACTIVITIES BUT WAS ALSO ABLE TO FIND TUTORIAL VIDEO FOR THIS SPECIFIC ASSIGNMENT. 
// USED STYLING FROM BOOTSTRAP BECAUSE THE CODING ITSELF TOOK FOREVER TO PIECE AND TIME IS PRECIOUS


// NEVER FORGET OTHERWISE CODE WILL NOT WORK 
$(document).ready(function(){


    //MY INITIAL ARRAY OF DISNEY "TOPICS"
    var topics = ["The Lion King", "Lizzie McGuire", "Mulan","Goofy",
    "Even Stevens","The Emperor's New Groove","Toy Story","Hannah Montana",
    "Aladdin","That's So Raven","Zenon","High School Musical","Frozen",
    "AirBud","Recess","Ducktales","Minnie Mouse"];



//CREATE ALL FUNCTIONS BELOW 


//THE FUNCTION TO DISPLAY IMG FROM GIPHY
    function displayImg(){

//THIS PART WAS STOLEN FROM IN CLASS ACTIVITY. USED AS A BASE 
//DELETES THE input PRIOR TO ADDING NEW INPUT SO THERE ARE NO REPEAT IMAGES
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        //SETTING THE LIMIT OF HOW MANY GIPHYS CAN BE RETURNED 
        var limitGif = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limitGif + "&api_key=DaLLU3tL0xCrlpsKU7voLIZbK8gPOAkh";   


        //CREATING AJAX CALL 
        // STOLE THIS CODE FROM OUR INCLASS EXAMPLE
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
// for loop goes through each gif and adds these variables
            for(var j = 0; j < limitGif; j++) {    
                //SAVING RESULTS AS VARIABLE 
                //CREATING DIV IN HTML ASSIGNED WITH "displayDiv"
                var displayDiv = $("<div>");
                //CREATING A CLASS INSIDE THE DIV CALLED "HOLDER" FOR CSS
                displayDiv.addClass("holder");
            
                // CREATING VARIABLE "image" AND USING JQUERY TO DISPLAY IMAGES THAT ARE RETURNED 
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                //GRABBING RATINGS FROM DATA FROM THE AJAX RESPONSE 
                var rating = response.data[j].rating;
                // TESTING MY RESPONSE 
                console.log(response);
                //THIS WILL BE THE VARIABLE OF RATINGS THAT WILL BE DISPLAYED IN THE HTML FILE 
                //ITS TAKING THE RATING FROM THE RESPONSE'S DATA 
                var pRating = $("<p>").text("Rating: " + rating);
                //ATTACHING THE RATING OF RESPONSE AND ATTACHING IT TO DISPLAY WITH IMAGE (displayDiv)
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });// CLOSING OF RESPONSE FUNCTION 
    } // CLOSING BRACKET OF displayImg FUNCTION 

//CREATING BUTTONS FOR EACH OF MY STRINGS IN MY TOPICS ARRAY
 // - ADD THE NEW INPUT FROM THE USER AND MAKE IT INTO A BUTTON 
    function renderButtons(){ 

//DELETES THE input PRIOR TO ADDING NEW INPUT SO THERE ARE NO REPEAT BUTTONS
        $("#display-buttons").empty();

        //LOOPS THROUGH THE TOPICS ARRAY FROM ABOVE 
        for (var i = 0; i < topics.length; i++){
// ADDING THE USERS INPUT TO THE TOPICS ARRAY
// DYNAMICALLY MAKES BUTTON FOR EACH INPUT IN THE ARRAY 
            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            //ADDING DATA ATTRIBUTE
            newButton.attr("data-name", topics[i]); 
            // ADDING THE TEXT FROM THE USER INPUT INTO THE BUTTON INTO TOPICS ARRAY 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); //APPEND THE BUTTON TO #display-buttons DIV 
        }
    }// CLOSING OF renderButtons FUNCTION 

//STEP 2: MAKE A VARIABLE NAMED "STATE" AND THEN STORE THE IMAGES DATA-STATE INTO IT
//USE THE .attr() METHOD FOR THIS
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

//THE FUNCTIONS FOT ANIMATING GIFS
      // STEP 3: CHECK IF THE VARIABLE "STATE" IS EQUAL TO "STILL"
      //THEN UPDATE THE "src" ATTRIBUTE OF THIS IMAGE TO ITS DATA-ANIMATE VALUE
      //AND UPDATE THE "DATA-STATE" ATTRIBUTE TO "ANIMATE"
    // IF "STATE" IS EQUAL TO "ANIMATE" THEN UPDATE THE "src" ATTRIBUTE OF "THIS"
    // IMAGE TO ITS DATA-STILL VALUE AND UPDATE THE DATA-STATE ATTRIBUTE TO "STILL"

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }// CLOSING BRACKET FOR imageChangeState FUNCTION

    //THE FUNCTION TO TAKE IN THE USERS INPUT 
    // HANDLES #submitPress BUTTON EVENT 
    $("#submitPress").on("click", function(){
        // GRABS THE USERS INPUT 
        var input = $("#user-input").val().trim();
        form.reset();
        // THE INPUT IS NOW ADDED TO THE TOPICS ARRAY 
        topics.push(input);
        //renderButtons FUNCTION IS CALLED WHICH MAKES BUTTONS FOR MY SUGGESTIONS (topics) PLUS THE USERS INPUT        
        renderButtons();

        //THIS LINE SO THE USER CAN PRESS ENTER INSTEAD OF PRESSING SUBMIT 
        return false;
    })
//EVOKING FUNCTION 
    renderButtons();

    //FUCNTIONS FOR DISPLAYING DISNEY GIFS AND IMAGES FROM USERS INPUT 
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});