const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
var level = 0;
// start the game by pressing any keyboard key
$(document).keypress(function(event){
    if(!started){
    nextSequence();
    $('h1').text("Level "+ level);
    started = true;
    }
});

// handler function 
$('.btn').click(function(){
    // choese the id
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
     //audio
     playAudio(userChosenColour);
    //animation
    animatePress(userChosenColour);
   

    //check answer
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];

    $('h1').text(`Level-${level++}`);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColour);
    
}

//checkAnswer
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
             }, 1000); 
        }
    }else{
        playAudio('wrong');
        $('body').addClass("game-over");
        $('h1').text('Game Over, Press Any Key to Restart');

        setTimeout(function(){
            $('body').removeClass("game-over");
        }, 200);
       startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
//animation
function animatePress(currentColour){
    // adding css
    $(`#${currentColour}`).addClass('pressed')

    // removing css after 100 ms. 
    setTimeout(function(){
    $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}

//sound / audio play
function playAudio(color){
    console.log(color)
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}