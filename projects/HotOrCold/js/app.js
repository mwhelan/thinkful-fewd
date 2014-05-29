
$(document).ready(function(){
    newGame();

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    $("a.new").click(function() {
        newGame();
    });

    $("#guessButton").click(function(event) {
        event.preventDefault();
        guess();
    });
});

var secretNumber;
var feedback;
var userGuess;
var guessCount;
var guessList;

function newGame() {
    disableInput(false);
    secretNumber = getSecretNumber();

    feedback = "Make your Guess!";
    userGuess = "";
    guessCount = 0;
    guessList = [];
    updateDisplay();
}

function guess() {
    var guess = $("#userGuess").val();
    if(!isValidGuess(guess)){
        userGuess = "";
        updateDisplay();
        return;
    }
    feedback = getFeedback(guess);
    guessCount++;
    guessList.push(guess);
    userGuess = "";
    updateDisplay();
}

function updateDisplay() {
    $("#feedback").text(feedback);
    $("#userGuess").val(userGuess);
    $("#count").text(guessCount);
    $("#guessList").empty();
    if(guessList.length > 0) {
        for(var i = 0; i < guessList.length; i++) {
            var listItem = "<li>" + guessList[i] + "</li>";
            $("#guessList").append(listItem);
        }
    }
    $("#userGuess").focus();
}

function getFeedback(guess) {
    /*
      1. First check if correct guess
      2. Check if hot (within 5) or cold (more than 30 away)
      3. If first guess then just compare if it is higher or lower than secret.
      4. If not hot or cold, then compare warmer or cooler to previous guess.
    */
    if(guess == secretNumber) {
        disableInput(true);
        return "You guessed it!";
    }

    /* within 5 of secret is hot */
    if(guess >= secretNumber - 5 && guess <= secretNumber + 5){
        return "You are hot!";
    }

    /* more than 30 away from secret is cold */
    if(guess <= secretNumber - 30 || guess >= secretNumber + 30){
        return "You are cold!";
    }

    /* first guess. Just evaluate high or low. */
    if(guessList.length === 0){
        if (guess > secretNumber) {
            return "Your guess is too high";
        }
        else if (guess < secretNumber) {
            return "Your guess is too low";
        }
        return;
    }

    /* Colder compared to previous option.*/
    var previousGuess = guessList[guessList.length - 1];
    if((guess > secretNumber && guess > previousGuess) ||
        (guess < secretNumber && guess < previousGuess)) {
        return "You are getting colder";
    }

    /* Warmer compared to previous option.*/
    if((guess > secretNumber && guess < previousGuess) ||
        (guess < secretNumber && guess > previousGuess)) {
        return "You are getting warmer";
    }

    /* if I get here then there is a missing condition I haven't calculated */
    return "Houston, we have a problem!";
}

function isValidGuess(guess) {
    /* trusting in JavaScript Or short circuit here! */
    if(guess === undefined || guess === null || guess.trim().length === 0 ||
        !isInteger(guess) || guess < 1 || guess > 100) {
        alert("Please enter an integer between 1 and 100.");
        return false;
    }

    if($.inArray(guess, guessList) !== -1){
        alert("You have already guessed " + guess);
        return false;
    }

    return true;
}

function getSecretNumber() {
    /* Produces random number between 1 and 100
     see information here: http://www.w3schools.com/jsref/jsref_random.asp */
    return Math.floor((Math.random() * 100) + 1);
}

function disableInput(disabled) {
    $("#userGuess").prop("disabled", disabled);
    $("#guessButton").prop("disabled", disabled);
}

function isInteger(input) {
    var value = +input;
    if(isNaN(input)){
        return false;
    }
    if(input % 1 !== 0){
        return false;
    }
    return true;
}