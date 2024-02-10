describe('the calcuations to get monthly payment', function() {

it('should calculate the monthly rate correctly', function () {
  const values = { amount: 100000, years: 30, rate: 7};
  const monthlyRate = ((values.rate / 100) / 12).toFixed(4); //there is an internal algorithm that makes the decial go to .00582451111225 to fix that I told the system only look for 4 decimals
  expect(monthlyRate).toEqual('0.0058');//this outcome is coming out as a string so i added ''
});

it('should calculate the total payments', function () {
  const values = { amount: 100000, years: 30, rate: 7};
  const totalPayments = values.years *12;
  expect(totalPayments).toEqual(360);//for some reason it failed when i passed a string
}); //need to figure out why this is coming back as a number and not a string, is it because there is no decimal?

it('should calculate the numerator', function () {
  const values = { amount: 100000, years: 30, rate: 7};
  const monthlyRate = ((values.rate / 100) / 12).toFixed(4);
  const numerator = (values.amount * monthlyRate);
  expect(numerator) .toEqual(580);
});//the pattern im seeing is that a decimal is going to return a string, and an interger as is

it('should calculate the denominator', function () {
  const values = { amount: 100000, years: 30, rate: 7};
  const monthlyRate = ((values.rate / 100) / 12).toFixed(4);
  const totalPayments = values.years *12;
  const denominator = (1 - Math.pow((1 + monthlyRate), -totalPayments));
  expect(denominator) .toEqual('0.8754');
});//this is really hard to test because of the math function involved, the system thinks this is a 1 it's not running the equation

it('should calculate the monthly payment correctly', function () {
  const values = { amount: 100000, years: 30, rate: 7};
  expect(calculateMonthlyPayment(values)) .toEqual('665.30');
});
});

// I wrote out the code step by step so that you can break down each calculation 


