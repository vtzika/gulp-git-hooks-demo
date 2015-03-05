var formValidator = (function() {

    var fieldIsNotEmpty = function(field) {
        if (field === '') {
            return false;
        }
        return true;
    };

    var fieldIsNumber = function(number) {
        if (isNaN(number)) {
            return false;
        }
        return true;
    };

    var fieldIsValidEmail = function(email) {
        var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegEx.test(email)) {
            return true;
        }
        return false;
    };

    var fieldHasMinLen = function(field, limit) {
        if (!isNaN(field)) {
            field = field.toString();
        }
        if (field.length >= limit) {
            return true;
        }
        return false;
    };

    var fieldHasMaxLen = function(field, limit) {
        if (!isNaN(field)) {
            field = field.toString();
        }

        if (field.length <= limit) {
            return true;
        }
        return false;
    };

    var showError = function(field, value, validator) {
        if (validatorMapping[validator](value)) {
            return '';
        }
        return field.charAt(0).toUpperCase() + field.slice(1) + errorMsgMapping[validator];
    };

    var liveValidation = function(field, keyPress) {
        keyPress = function() {
            field.addEventListener('keyup', validator);
        };
        if (keyPress) {
            return true;
        }
        return false;
    };

    var validatorMapping = {
        fieldIsNotEmpty: fieldIsNotEmpty,
        fieldIsNumber: fieldIsNumber,
        fieldIsValidEmail: fieldIsValidEmail
    };

    var errorMsgMapping = {
        fieldIsNotEmpty: ' is empty.',
        fieldIsNumber: ' is not a number.',
        fieldIsValidEmail: ' is not a valid.'
    };

    return { fieldIsNotEmpty: fieldIsNotEmpty,
             fieldIsNumber: fieldIsNumber,
             fieldIsValidEmail: fieldIsValidEmail,
             fieldHasMinLen: fieldHasMinLen,
             fieldHasMaxLen: fieldHasMaxLen,
             showError: showError,
             liveValidation: liveValidation
    };

}());