const rlSync = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors"];

//Adds "=>" to indicate output
function prompt(message) {
  message = `=>` + message;
  return message;
}

while (true) {
  //Gets player choice
  let choice = rlSync
    .question(prompt(`Choose one: ${VALID_CHOICES.join(", ")} `))
    .toLowerCase();

  //Validates player choice
  while (!VALID_CHOICES.includes(choice)) {
    console.log(prompt("That's not a valid choice. Please try again: "));
    choice = rlSync.question();
  }

  //Creates random computer choice
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let compChoice = VALID_CHOICES[randomIndex];

  //Prints player and computer choices
  console.log(prompt(`You chose ${choice}, I chose ${compChoice}.`));

  //Determines and prints winner
  if (
    (choice === "rock" && compChoice === "scissors") ||
    (choice === "paper" && compChoice === "rock") ||
    (choice === "scissors" && compChoice === "paper")
  ) {
    console.log(prompt("You win!"));
  } else if (
    (choice === "rock" && compChoice === "paper") ||
    (choice === "paper" && compChoice === "scissors") ||
    (choice === "scissors" && compChoice === "rock")
  ) {
    console.log(prompt("Computer wins!"));
  } else {
    console.log(prompt("It's a tie"));
  }

  //Asks to play again
  console.log(prompt("Would you like to play again? (y/n) "));
  let response = rlSync.question().toLowerCase();
  while (response[0] !== "y" && response[0] !== "n") {
    console.log(prompt("Please choose either (y/n) "));
    response = rlSync.question();
  }

  if (response[0] !== "y") break;
}
