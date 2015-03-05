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

    var showError = function(field, value, validator, limit) {
        if (limit > 0) {
            validation = validatorMapping[validator](value, limit);
        }
        else
            validation = validatorMapping[validator](value);

        if (validation) {
            return '';
        }
<<<<<<< HEAD
        return 'ERROR';
=======
        return field.charAt(0).toUpperCase() + field.slice(1) + errorMsgMapping[validator];
>>>>>>> aa47ea7d5f208366872482b0e8aa8351f34348a3
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
        fieldIsValidEmail: fieldIsValidEmail,
        fieldHasMinLen: fieldHasMinLen,
        fieldHasMaxLen: fieldHasMaxLen
    };

    var errorMsgMapping = {
        fieldIsNotEmpty: ' is empty.',
        fieldIsNumber: ' is not a number.',
        fieldIsValidEmail: ' is not a valid.',
        fieldHasMinLen: ' is too small.',
        fieldHasMaxLen: ' is too big.'
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