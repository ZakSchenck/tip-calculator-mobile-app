// Variables
const tipGridBtn = document.querySelectorAll(".option-tip-grid");
const tipInput = document.querySelector("#tip-calculator__percent");
const taxGridBtn = document.querySelectorAll(".option-tax-grid");
const taxInput = document.querySelector("#tax-calculator__percent");
const tipInputTotal = document.querySelector("#tip-calculator__total");
const calculateBtn = document.querySelector("button");
const splitInput = document.querySelector("#split-input");
const errorMessages = [
  "None of the inputs can end with a period",
  "Please make sure you have no empty inputs",
  "There can not be more than one period in inputs",
  "An input cannot have just a period",
  "Split input must be between 1 and 12"
];
const periodDuplicate = {};

/* Forces number OR period in input field
   Returns Boolean
*/
const isNumberAndDot = (e) => {
  const charCode = e.which ? e.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};

/* Forces number in input field
   Returns Boolean
*/
function isNumber(e) {
  const charCode = e.which ? e.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

// For each methods to set inputs to value based on what button is clicked
tipGridBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipInput.value = e.target.innerText.slice(0, -1);
  });
});
taxGridBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    taxInput.value = e.target.innerText.slice(0, -1);
  });
});

/* 
   Validates whether the calculation will go through
   Returns boolean 
*/
const periodDuplicateFunction = (input) => {
  const inputVal = input.value.split("");

  for (let i = 0; i < inputVal.length; i++) {
    periodDuplicate[inputVal[i]]
      ? (periodDuplicate[inputVal[i]] += 1)
      : (periodDuplicate[inputVal[i]] = 1);
  }
  if (periodDuplicate["."] > 1) {
    return true;
  }
  return false;
};

// Math calculation checker
const calculateResults = () => {
    const tipTotal = document.querySelector("#tip-total");
    const taxTotal = document.querySelector("#tax-total");
    const amountTotal = document.querySelector("#amount-total");
    const tax = (Number(taxInput.value) / 100 ) * Number(tipInputTotal.value)
    const tip = (Number(tipInput.value) / 100 ) * Number(tipInputTotal.value)
    const split = Number(splitInput.value)
    const totalAmount = Number(tipInputTotal.value) + tax + tip
    amountTotal.innerText = `$${(totalAmount / split).toFixed(2)}`
    taxTotal.innerText = `$${(tax / split).toFixed(2)}`
    tipTotal.innerText = `$${(tip / split).toFixed(2)}`
}

// Validates inputs when calculate button is clicked
const validationChecker = () => {
    const validatorError = document.querySelector('#validator-error');
  if (
    tipInputTotal.value === "" ||
    taxInput.value === "" ||
    tipInput.value === "" ||
    splitInput.value === ""
  ) {
    validatorError.innerText = errorMessages[1];
  } else if (
    tipInputTotal.value.charAt(tipInputTotal.value.length - 1) === "." ||
    taxInput.value.charAt(taxInput.value.length - 1) === "." ||
    tipInput.value.charAt(tipInput.value.length - 1) === "."
  ) {
    validatorError.innerText = errorMessages[0];
  } else if (
    periodDuplicateFunction(tipInputTotal) ||
    periodDuplicateFunction(taxInput) ||
    periodDuplicateFunction(tipInput)
  ) {
    validatorError.innerText = errorMessages[2];
  } else if (
    tipInputTotal.value === "." ||
    taxInput.value === "." ||
    tipInput.value === "."
  ) {
    validatorError.innerText = errorMessages[3];
  } else if (Number(splitInput.value) < 1 || Number(splitInput.value) > 12) {
    validatorError.innerText = errorMessages[4]
  }  else {
    calculateResults();
    validatorError.innerText = "";
  }
};


calculateBtn.addEventListener("click", () => {
  validationChecker();
});
