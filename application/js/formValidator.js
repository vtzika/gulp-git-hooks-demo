    /**
    * This is a module for form validation.
    * It contains validators and functions that return the errors which are in the validation.
    */
var formValidator = (function() {

    /**
    * This function validates if a field is empty.
    * @param {string} field - The value of the field.
    * @return {boolean} - It's true when the validation passes and false when it fails.
    */
    var fieldIsNotEmpty = function(field) {
        if (field === '') {
            return false;
        }
        return true;
    };

    /**
    * This function validates if a field is number.
    * @param {number} field - The value of the field.
    * @return {boolean} - It's true when the validation passes and false when it fails.
    */
    var fieldIsNumber = function(number) {
        if (isNaN(number)) {
            return false;
        }
        return true;
    };

    /**
    * This function validates if a field is a valid email.
    * @param {string} field - The value of the field.
    * @return {boolean} - It's true when the validation passes and false when it fails.
    */
    var fieldIsValidEmail = function(email) {
        var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegEx.test(email)) {
            return true;
        }
        return false;
    };

    /**
    * This function validates if a field is long enough.
    * @param {string} field - The value of the field.
    * @param {number} limit - The limit of the field's length.
    * @return {boolean} - It's true when the validation passes and false when it fails.
    */
    var fieldHasMinLen = function(field, limit) {
        if (!isNaN(field)) {
            field = field.toString();
        }
        if (field.length >= limit) {
            return true;
        }
        return false;
    };

    /**
    * This function validates if a field is not too long.
    * @param {string} field - The value of the field.
    * @param {number} limit - The limit of the field's length.
    * @return {boolean} - It's true when the validation passes and false when it fails.
    */
    var fieldHasMaxLen = function(field, limit) {
        if (!isNaN(field)) {
            field = field.toString();
        }

        if (field.length <= limit) {
            return true;
        }
        return false;
    };

    /**
    * This function returns the error message if exists.
    * @param {string} field - The value of the field.
    * @param {value} value - Is the value of the field.
    * @param {string} validator - Is the validator for the field.
    * @param {number} limit - The limit of the field's length.
    * @return {boolean} - When it's true, it return an error and when it's false it returns nothing.
    */
    var showError = function(field, value, validator, limit) {
        if (limit > 0) {
            validation = validatorMapping[validator](value, limit);
        }
        else
            validation = validatorMapping[validator](value);

        if (validation) {
            return '';
        }
        return field.charAt(0).toUpperCase() + field.slice(1) + errorMsgMapping[validator];
    };

    /**
    * Object which contains all the validators.
    * @type {object}
    */
    var validatorMapping = {
        fieldIsNotEmpty: fieldIsNotEmpty,
        fieldIsNumber: fieldIsNumber,
        fieldIsValidEmail: fieldIsValidEmail,
        fieldHasMinLen: fieldHasMinLen,
        fieldHasMaxLen: fieldHasMaxLen
    };

    /**
    * Object which contains all the different error messages for every specific validator.
    * @type {object}
    */
    var errorMsgMapping = {
        fieldIsNotEmpty: ' is empty.',
        fieldIsNumber: ' is not a number.',
        fieldIsValidEmail: ' is not a valid.',
        fieldHasMinLen: ' is too small.',
        fieldHasMaxLen: ' is too big.'
    };

    var returnedValues = {
        showError: showError
    };

    /* test-code */
    returnedValues.fieldIsNotEmpty = fieldIsNotEmpty;
    returnedValues.fieldIsNumber = fieldIsNumber;
    returnedValues.fieldIsValidEmail = fieldIsValidEmail;
    returnedValues.fieldHasMinLen = fieldHasMinLen;
    returnedValues.fieldHasMaxLen = fieldHasMaxLen;
    /* end-test-code */

    return returnedValues;

}());