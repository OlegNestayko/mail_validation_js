window.addEventListener("load", function () {
  initForm();
});
/* Form initialization function*/
function initForm() {
  /* Finding a form by name */
  const form = document.querySelector('form[name="form1"]');
  /* Register event handlers for form fields */
  registerEventListeners(form);
}

function registerEventListeners(form) {
  /* Finding form fields by their names */
  const nameInput = form.querySelector('input[name="userName"]');
  const emailInput = form.querySelector('input[name="email"]');
  const zipInput = form.querySelector('input[name="zip"]');
  const submitButton = form.querySelector('input[type="submit"]');

  /* Register 'input' event handlers on form fields */
  nameInput.addEventListener("input", function () {
    /* Calling the validation function */
    validateInput(nameInput, /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/);
  });

  emailInput.addEventListener("input", function () {
    validateInput(emailInput, /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i);
  });

  zipInput.addEventListener("input", function () {
    validateInput(zipInput, /^\d{5}(?:[-\s]\d{4})?$/);
  });

  /* Register a 'submit' event handler on the form */
  form.addEventListener("submit", function (event) {
    /* Override browser default action */
    event.preventDefault();
    /* Perform validation on all form fields */
    const isValid =
      validateInput(nameInput, /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/) &&
      validateInput(emailInput, /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i) &&
      validateInput(zipInput, /^\d{5}(?:[-\s]\d{4})?$/);
    /* If the form is valid, submit it */
    if (isValid) {
      form.submit();
    } else {
      /* If the form is not valid, we display an error message */
      alert("Mistakes made while filling out the form!");
    }
  });
}

function validateInput(inputElement, regexPattern) {
  /* Getting the value of the input field */
  const inputValue = inputElement.value;
  /* Checking if a value matches a regular expression */
  const isValid = regexPattern.test(inputValue);
  /* If the value fails the check, add the class 'invalid', otherwise remove 'invalid' and add 'valid' */
  if (!isValid) {
    inputElement.classList.add("invalid");
    inputElement.classList.remove("valid");
  } else {
    inputElement.classList.remove("invalid");
    inputElement.classList.add("valid");
  }
  /* Returning the test result */
  return isValid;
}
