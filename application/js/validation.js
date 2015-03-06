var validate = function(fields) {

    for (var i = 0; i < fields.length; i++) {
        if (fields[i] === 'email') {
            validator = 'fieldIsValidEmail';
        } else {
            validator = 'fieldIsNotEmpty';
        }
        var elem = document.contactform[fields[i]];
        errorElement = document.getElementById('error_' + fields[i]);
        fieldValidation(fields[i], elem, validator, errorElement);
    }
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
    err = formValidator.showError(field, fieldValue, validator);
    errorElement.innerHTML = err;

};

document.getElementById('submit').addEventListener('click', function() {
    fields = ['name', 'email', 'telephone', 'subject', 'message'];
    validate(fields);
});

var formElems = document.contactform.elements;
for (var i = 0; i < formElems.length; i++) {

    formElems[i].addEventListener('keyup', function() {
        fields = [this.name];
        validate(fields);
    });
}
