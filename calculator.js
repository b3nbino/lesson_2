// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

let rlSync = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");
let languageChoice = rlSync.question(
  'Please enter "english" if you would like to continue in English.\nIngrese "espanol" si desea continuar en espanol.'
);
let language;
let valid;
do {
  if (languageChoice === "english") {
    language = 0;
    valid = true;
  } else if (languageChoice === "espanol") {
    language = 1;
    valid = true;
  } else {
    console.log(
      'Please enter "english" or "espanol\nPor favor ingresa "english" o "espanol"'
    );
    valid = false;
  }
} while (!valid);

let keepGoing = "n";

do {
  function prompt(message) {
    //Adds "=>" to indicate output
    message = `=>` + message;
    return message;
  }
  function invalidNumber(number) {
    //Tests user input for valid number
    return number.trimStart() === "" || Number.isNaN(Number(number));
  }

  console.log(MESSAGES[language]["welcome"]);
  let firstNum = rlSync.question(
    prompt(MESSAGES[language]["firstNumberPrompt"])
  ); //Get first number and test for validation
  while (invalidNumber(firstNum)) {
    firstNum = rlSync.question(prompt(MESSAGES[language]["invalidNumber"]));
  }

  let secondNum = rlSync.question(
    prompt(MESSAGES[language]["secondNumberPrompt"])
  ); //Get second number and test for validation
  while (invalidNumber(secondNum)) {
    secondNum = rlSync.question(prompt(MESSAGES[language]["invalidNumber"]));
  }

  let operation = rlSync.question(
    prompt(MESSAGES[language]["operationPrompt"])
  ); //Get operation
  while (!["1", "2", "3", "4"].includes(operation)) {
    //Tests user input for valid operator selection
    operation = rlSync.question(prompt(MESSAGES[language]["invalidOperation"]));
  }

  let result;

  function add(num1, num2) {
    //Operation functions
    return Number(num1) + Number(num2);
  }
  function subtract(num1, num2) {
    return Number(num1) - Number(num2);
  }
  function multiply(num1, num2) {
    return Number(num1) * Number(num2);
  }
  function divide(num1, num2) {
    return Number(num1) / Number(num2);
  }

  switch (
    operation //Executes user operation choice
  ) {
    case "1":
      result = add(firstNum, secondNum);
      console.log(prompt(MESSAGES[language]["final"] + result));
      break;
    case "2":
      result = subtract(firstNum, secondNum);
      console.log(prompt(MESSAGES[language]["final"] + result));
      break;
    case "3":
      result = multiply(firstNum, secondNum);
      console.log(prompt(MESSAGES[language]["final"] + result));
      break;
    case "4":
      result = divide(firstNum, secondNum);
      console.log(prompt(MESSAGES[language]["final"] + result));
      break;
  }

  keepGoing = rlSync.question(MESSAGES[language]["more"]); //Asks the user if they want to do more calculations
} while (keepGoing === "y");
