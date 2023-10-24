let rlSync = require("readline-sync");
const MESSAGES = require("./mortgage_messages.json");
let again = false;

function invalidNumber(number) {
  //Tests user input for valid number
  return number.trimStart() === "" || Number.isNaN(Number(number));
}
function invalidYON(string) {
  if (string !== "y" && string !== "n") {
    return true;
  } else if (string === "y") {
    again = true;
    return false;
  } else {
    again = false;
    return false;
  }
}
function prompt(message) {
  //Adds "=>" to indicate output
  message = `-->` + message;
  return message;
}

console.log(prompt(MESSAGES["greeting"]));

do {
  let loanAmount = rlSync.question(prompt(MESSAGES["loanAsk"])); //Gets user input for loanAmount and checks validation then makes it a number
  while (invalidNumber(loanAmount)) {
    loanAmount = rlSync.question(prompt(MESSAGES["invalidLoanDuration"]));
  }
  loanAmount = parseFloat(loanAmount);

  let loanTerm = rlSync.question(prompt(MESSAGES["durationAsk"])); //Gets user input for loanTerm and checks validation then makes it a number
  while (invalidNumber(loanTerm)) {
    loanTerm = rlSync.question(prompt(MESSAGES["invalidLoanDuration"]));
  }
  loanTerm = Number(loanTerm);

  let interestRate = rlSync.question(prompt(MESSAGES["interestAsk"])); //Gets user input for interestRate and checks validation then makes it a number and percentage
  while (invalidNumber(interestRate)) {
    interestRate = rlSync.question(prompt(MESSAGES["invalidRate"]));
  }
  interestRate = parseFloat(interestRate) / 100;
  let monthlyInterestRate = interestRate / 12;

  function calculateMortgage(amount, term, rate) {
    //Takes user input and determines monthly paymeny based on aformentioned information
    let monthlyPayment = amount * (rate / (1 - Math.pow(1 + rate, -term)));
    return monthlyPayment;
  }

  console.log(
    //Display paymentAmount based on user input
    prompt(
      MESSAGES["paymentAmount"] +
        calculateMortgage(loanAmount, loanTerm, monthlyInterestRate).toFixed(
          2
        ) +
        MESSAGES["perMonth"]
    )
  );
  //Ask user to calculate again and test input validity
  let isInvalid = true;
  let finish = rlSync.question(prompt(MESSAGES["redo"]));
  do {
    if (finish === "y") {
      again = true;
    } else if (finish === "n") {
      again = false;
    } else {
      while (invalidYON(finish)) {
        finish = rlSync.question(prompt(MESSAGES["invalidRedo"]));
      }
    }
  } while (invalidYON(finish));
} while (again);
console.log(prompt(MESSAGES["goodbye"]));
