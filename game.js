
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var started=false;
var level = 0;

//$("h1").css("color","red");

//The game start when the use press any key
$(document).keypress(function() {

    if(!started){
     $("#GameLevelTitle").text("Level " + level)
     nextSequence();
    started = true;
    }
});



$(".Button").click(function(){

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    });

    



////////////////////METHOSD TO CALL ////////////////////////////////



function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
        console.log("success ");

        if(userClickedPattern.length ===  gamePattern.length){
    
        setTimeout(function() {
          nextSequence();
        },1000 );
    }
    
 } else{
        console.log("wrong");
        setTimeout(function(){
           playSound("fastEnd");
        }, 350);

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");  
        }, 250);

        $("#GameLevelTitle").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
 }
    


function nextSequence() {
    userClickedPattern= [];

    level++;
    $("#GameLevelTitle").text("Level" + level);

var randomNumber= Math.floor(Math.random()* 4);
var randomChosenColour= buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}

function playSound(name){
var audio = new Audio("sounds/" +name + ".mp3");
audio.play();
}


function animatePress(currentColor){

$("#" + currentColor).addClass("ButtonPressed");

setTimeout(function () {
    $("#" + currentColor).removeClass("ButtonPressed");
  }, 100);

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false
}

