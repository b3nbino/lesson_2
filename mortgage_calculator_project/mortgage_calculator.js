let rlSync = require("readline-sync");
let again = false;

function invalidNumber(number) {
  //Tests user input for valid number
  return number.trimStart() === "" || Number.isNaN(Number(number));
}
function prompt(message) {
  //Adds "=>" to indicate output
  message = `-->` + message;
  return message;
}

console.log(
  prompt(
    "Hello! Welcome to the world famous DragonDuck Mortgage Calculator!\n    Please enter the following information to determine your monthly payment."
  )
);

do {
  let loanAmount = rlSync.question(prompt("Loan Amount: $")); //Gets user input for loanAmount and checks validation then makes it a number
  while (invalidNumber(loanAmount)) {
    loanAmount = rlSync.question(prompt("Input invalid. Please try again: "));
  }
  loanAmount = parseFloat(loanAmount);

  let loanTerm = rlSync.question(prompt("Loan Duration/Term (months): ")); //Gets user input for loanTerm and checks validation then makes it a number
  while (invalidNumber(loanTerm)) {
    loanTerm = rlSync.question(prompt("Input invalid. Please try again: "));
  }
  loanTerm = Number(loanTerm);

  let interestRate = rlSync.question(prompt("Yearly Interest Rate: %")); //Gets user input for interestRate and checks validation then makes it a number and percentage
  while (invalidNumber(interestRate)) {
    interestRate = rlSync.question(
      prompt("Input invalid. Please try again: %")
    );
  }
  interestRate = parseFloat(interestRate) / 100;
  let monthlyInterestRate = interestRate / 12;

  function calculateMortgage(amount, term, rate) {
    //Takes user input and determines monthly paymeny based on aformentioned information
    let monthlyPayment = amount * (rate / (1 - Math.pow(1 + rate, -term)));
    return monthlyPayment;
  }

  console.log(
    prompt(
      `It looks like your monthly payment will be $${calculateMortgage(
        loanAmount,
        loanTerm,
        monthlyInterestRate
      ).toFixed(2)} per month.`
    )
  );

  let finish = rlSync.question(
    prompt(
      "Would you like to calculate again? If so please enter 'y' if not enter 'n'."
    )
  );
  if (finish === "y") {
    again = true;
  } else if (finish === "n") {
    again = false;
  } else {
    finish = rlSync.question(
      prompt('Invalid input. Please enter either "y" or "n"')
    );
  }
} while (again);
console.log(
  prompt("Thank you for using DragonDuck Mortgage Calculator! Goodbye!")
);
