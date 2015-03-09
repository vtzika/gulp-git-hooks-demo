/**
* This function validates the contact form fields.
* @param {array} fields - An array with all the form fields.
*/
var validateField = function(field) {
    var validators = fieldValidatorMapping[field];
    if (!(field in fieldValidatorMapping)) {
        return;
    }
    for (var j = 0; j < validators.length; j++) {
        var elem = document.contactform[field];
        errorElement = document.getElementById('error_' + field);
        var hasNoError = showError(field, elem.value, validators[j], errorElement);
        if (!hasNoError) {
            break;
        }
    }
};

/**
* Array which maps the field of the contact form with the validators.
* @type {array}
*/
var fieldValidatorMapping = {
        name: ['fieldIsNotEmpty'],
        telephone: ['fieldIsNotEmpty', 'fieldIsNumber', ['fieldHasMaxLen', 13], ['fieldHasMinLen', 8]],
        email: ['fieldIsNotEmpty', 'fieldIsValidEmail'],
        subject: ['fieldIsNotEmpty'],
        message: ['fieldIsNotEmpty', ['fieldHasMaxLen', 200], ['fieldHasMinLen', 10]]

    };

/**
* This function shows the error when the validation fails.
* @param {string} field - The name of the contact form field.
* @param {string | number} value - It's the value of the field.
* @param {string} validator - It's the field validator.
* @param {html element} errorElement - It's the paragraph element to expose the errors.
* @return {boolean} - It's true when there aren't erros and it's false when there are errors.
*/
var showError = function(field, value, validator, errorElement) {
    if (Array.isArray(validator)) {
        error = formValidator.showError(field, value, validator[0], validator[1]);
    }
    else {
        error = formValidator.showError(field, value, validator);
    }
    errorElement.innerHTML = error;

    if (error === '') {
        return true;
    } return false;
};

/**
* Click event is added to the submit button.
* When submit button is clicked the form is validated.
*/
document.getElementById('submit').addEventListener('click', function() {
    fields = ['name', 'email', 'telephone', 'subject', 'message'];
    fields.forEach(validateField);
});

/**
* Form elements
* @type {array}
*/
var formElems = document.contactform.elements;

/**
* it calls the validate function
* @param {Element} event - The binded element.
*/
var onKeyUpValidate = function(event) {
    validateField(this.name);
};

/**
* This function runs the validation when the keys are pressed.
*/
for (var i = 0; i < formElems.length; i++) {
    formElems[i].addEventListener('keyup', onKeyUpValidate.bind(formElems[i]), false);
}