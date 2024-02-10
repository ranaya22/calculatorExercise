window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log('submitted');
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.querySelector("#loan-amount").value),
    years: +(document.querySelector("#loan-years").value),
    rate: +(document.querySelector("#loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = { amount: 100000, years: 30, rate: 7 };
  const newAmount = document.querySelector("#loan-amount");
  newAmount.value = values.amount;
  const newYears = document.querySelector("#loan-years");
  newYears.value = values.years;
  const newRate = document.querySelector("#loan-rate");
  newRate.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const totalPayments = values.years *12;
  const numerator = values.amount * monthlyRate;
  const denominator = (1 - Math.pow((1 + monthlyRate), -totalPayments));
  const monthlyPayment = (numerator / denominator).toFixed(2);
  return monthlyPayment;
}


// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.querySelector("#monthly-payment");
  monthlyUI.innerText = "$" + monthly;
}
