var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
    if(!started){
		$("#level-title").html("Level " +level);

		nextSequence();
		started = true;
}
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	
	playSound(userChosenColour);

	animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
	//if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

	//If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
	  if(gamePattern.length === userClickedPattern.length){
	  	setTimeout(function() {
	  		nextSequence();
	  	}, 1000);
	  }

	}else{
		playSound("wrong");

		$("body").addClass("game-over");
		$("#level-title").html("Game Over, Press Any Key to Restart");
		setTimeout(function(){
			$("body").removeClass("game-over")
		}, 200);

	

	//Call startOver() if the user gets the sequence wrong.
	startOver();

    }

}

function nextSequence(){

	userClickedPattern = [];
	
	 level++;

    $("#level-title").html("Level " +level);

	var randomNumber = Math.round(Math.random()*4);
	var randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	
	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	}, 100);

}


function playSound(name){
	var audio = new Audio("sounds/" + name +".mp3");
    audio.play();

}

//Inside this function,reset the values of level, gamePattern and started variables.
function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}