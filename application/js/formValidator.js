var formValidator = (function () {

    var fieldNotEmpty = function (field) {
        if(field==='') {
            return false;
        } 
        return true;
    } 

    var fieldIsNumber = function (number) {
    
        if(isNaN(number)) {
            return false;
        }
        return true;
    }

    var fieldValidEmail = function (email) {
        var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailRegEx.test(email)) {
            return true;
        }
        return false;
    } 

    var fieldMinLet = function (letters) {
        if(letters.length > 2) {
            return true;
        }
        return false;
    }
    
    return { fieldNotEmpty : fieldNotEmpty,
             fieldIsNumber : fieldIsNumber,
             fieldValidEmail : fieldValidEmail,
             fieldMinLet : fieldMinLet
     }


}());