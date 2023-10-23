// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

let rlSync = require("readline-sync");
let messages = require("./calculator_messages.json");

let keepGoing = "n";

do {
  function prompt(message) {
    message = `=>` + message;
    return message;
  }
  function invalidNumber(number) {
    return number.trimStart() === "" || Number.isNaN(Number(number));
  }

  console.log("Welcome to the Calculator!");
  let firstNum = rlSync.question(prompt("What's the first number?\n")); //Get first number and test for validation
  while (invalidNumber(firstNum)) {
    firstNum = rlSync.question(
      prompt(`Hmm... that doesn't look like a valid number.\n`)
    );
  }

  let secondNum = rlSync.question(prompt("What's the second number?\n")); //Get second number and test for validation
  while (invalidNumber(secondNum)) {
    secondNum = rlSync.question(
      prompt(`Hmm... that doesn't look like a valid number.\n`)
    );
  }

  let operation = rlSync.question(
    prompt(
      "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide\n"
    )
  ); //Get operation
  while (!["1", "2", "3", "4"].includes(operation)) {
    operation = rlSync.question(prompt("Must choose 1, 2, 3 or 4\n"));
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

  switch (operation) {
    case "1":
      result = add(firstNum, secondNum);
      console.log(prompt(`The result is: ${result}`));
      break;
    case "2":
      result = subtract(firstNum, secondNum);
      console.log(prompt(`The result is: ${result}`));
      break;
    case "3":
      result = multiply(firstNum, secondNum);
      console.log(prompt(`The result is: ${result}`));
      break;
    case "4":
      result = divide(firstNum, secondNum);
      console.log(prompt(`The result is: ${result}`));
      break;
  }

  keepGoing = rlSync.question(
    'Would you like to continue? Enter "y" for yes and "n" for no.'
  );
} while (keepGoing === "y");
