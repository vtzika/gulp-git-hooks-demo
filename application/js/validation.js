var validate = function(fields) {

    for (var i = 0; i < fields.length; i++) {
        var validators = fieldValidatorMapping[fields[i]];
        for (var j = 0; j < validators.length; j++) {
            console.log(validators[j]);
            var elem = document.contactform[fields[i]];
            errorElement = document.getElementById('error_' + fields[i]);
            var hasNoError = fieldValidation(fields[i], elem, validators[j], errorElement);
            if (!hasNoError) {
                break;
            }
        }
    }
};

var fieldValidatorMapping = {
        name: ['fieldIsNotEmpty'],
        telephone: ['fieldIsNotEmpty', 'fieldIsNumber'],
        email: ['fieldIsValidEmail'],
        subject: ['fieldIsNotEmpty'],
        message: ['fieldIsNotEmpty']
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

var fieldValidation = function(field, element, validator, errorElement) {
    var fieldValue = element.value;
    error = formValidator.showError(field, fieldValue, validator);
    errorElement.innerHTML = error;

    if (error === '') {
        return true;
    } return false;
};

document.getElementById('submit').addEventListener('click', function() {
    fields = ['name', 'email', 'telephone', 'subject', 'message'];
    validate(fields);
});

var formElems = document.contactform.elements;
for (var i = 0; i < formElems.length; i++) {

    formElems[i].addEventListener('keyup', function() {
        validate([this.name]);
    });
}
