// Psychic Game Javascript file

//The purpose of the game is to have the player guess a letter. The player has 10 tries. If the player guesses the randomly picked letter, the player wins the round
// and the counter resets so the player can play another round. If the player runs out of guesses and has not chosen the randomly picked letter, the player loses the
// round and is given another chance to play again. There is no limit to the number of times a player can play.

// Steps

// Computer is going to pick a letter of the alphabet randomly

var choices = ["a" , "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// This object will keep track of all of the values within the game
var userScore = {
  wins: 0,
  losses: 0,
  // This counter will go down with each wrong guess the player makes
  turnsLeft: 10,
  // The letters the user has chosen will be placed into this array
  chosenLetter: []
}
//Computer's initial choice
var computerChoice = null;

// This is the first function in the game. It randomly chooses a letter from the array choices [] so the Player can guess it.
function computerChooses(){
  //by adding the object 'this.' I made sure the variable could not be replaced.
  this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
  console.log(computerChoice);
}
computerChooses();

// This function displays the number of guesses the player has left in the round
function turnsLeft(){
  document.querySelector("#guessesLeft").innerHTML = "Turns Left: " + userScore.guessesLeft;
}
turnsLeft();

//This function displays the letter(s) the user chose during the round 
function chosenLetters(){
  document.querySelector("#guessedLetter").innerHTML = "Your predictions so far: " + userScore.chosenLetter.join(" ");
}

//This function will reset certain parameters at the end of the round. It allows the user to continue playing for as long as he wants
function reset(){
  //Default turnsLeft value
  userScore.turnsLeft = 10;
  //Execute the function to update the HTML doc with the default value
  turnsLeft();
  //Default chosenLetter value
  userScore.chosenLetter = [];
  //call the function to display it.
  chosenLetters();
  //reset the computer's choice
  computerChooses();
}

// This function will 'listen' to the keys being pressed to trigger the event
document.onkeyup = function(event){
  var userChoice = String.fromCharCode(event.keyCode).toLowerCase();

  // This function wil compare the key pressed agains the array choice[]
  var exists = choices.some(function(choice){
    //if the user choses a letter within the array of choices the some() function will begin
    if(userChoice === choice){
      //It will first substract the turnsLeft key value by one
      userScore.turnsLeft--;
      // and executes the function turnsLeft() to display how many turns are left
      turnsLeft();
      //Then, it will populate the chosenLetter array with the letter pressed
      userScore.chosenLetter.push(userChoice);
      //and finally display the letter that was just pushed into the array.
      chosenLetters();

      //This statement compares the user's choice against the computer and increases userScore.wins by 1 if they match
      if(userChoice === computerChoice){
          userScore.wins++;
          //Fun message to encourage the player
          alert("You must be a psychic!");
          // Then, we adjust the wins counter on the screen
          document.querySelector("#wins").innerHTML = "Wins: " + userScore.wins;
          //Once the round is concluded, the reset function is activated to start the game again
          reset();

          //If user did not choose the same letter as the computer, then the game continues until the turnsLeft counter reaches 0. 
          // Then, it will increase the losses by 1 and trigger the reset function.
        } else if(userChoice !== computerChoice){
              if(userScore.turnsLeft === 0){
                  userScore.losses++;
                  alert("You're not a psychic, pick a different profession!")
                  document.querySelector("#losses").innerHTML = "Losses: " + userScore.losses;
                  reset();
                  }
                }

      return true;      
    }

  });
  //if user picks a character that is not in the choice[], this alert will let them know.
  if (!exists) {
    alert("Only letters are allowed!");
  } 

};