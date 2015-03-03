var formValidator = (function() {

    var fieldNotEmpty = function(field) {
        if (field === '') {
            return false;
        }
        return true;
    }

    var fieldIsNumber = function(number) {
        if (isNaN(number)) {
            return false;
        }
        return true;
    }

    return { fieldNotEmpty: fieldNotEmpty,
             fieldIsNumber: fieldIsNumber
     }
}());