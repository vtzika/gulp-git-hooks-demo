/*global describe, it, formValidator, expect */

// Form
describe ('Formvalidator contains', function () {
    // Not empty
    describe ('Required field', function () {
        it ('should be false when the field is empty', function() {
            var r = formValidator.fieldNotEmpty('');
            expect(r).toBe(false);
        });
        it ('should be true when the field is not empty', function() {
            var r = formValidator.fieldNotEmpty('field');
            expect(r).toBe(true);
        });
    });

    // Number
    describe ('Numerical field', function () {
        it ('should be false when the field is not a number', function() {
            var r = formValidator.fieldIsNumber('number');
            expect(r).toBe(false);

        });
        it ('should be true when the field is a number', function() {
            var r = formValidator.fieldIsNumber(7);
            expect(r).toBe(false);
        });
    });

    // Email signs
    describe ('Validation of email', function () {
        it ('should return false when the email is not valid', function() {
            var r = formValidator.fieldValidEmail('');
            expect(r).toBe(false);

        });
        it ('should return true when the email is valid', function() {
            var r = formValidator.fieldValidEmail('email@email.com');
            expect(r).toBe(true);
        });
    });


    // Minimum number of letters
    describe ('Validation of fields with minimum number of letters limit', function () {
        it ('should be false when there are not enough letters', function() {
            var r = formValidator.fieldMinLet('a', 2);
            expect(r).toBe(false);

        });
        it ('should be true when there are enough letters', function() {
            var r = formValidator.fieldMinLet('abc', 2);
            expect(r).toBe(true);
        });
    });

    // Maximum number of letters
    describe ('Validation of fields with maximum number of letters limit', function () {
        it ('should be false when there are too much letters', function() {
            var r = formValidator.fieldMaxLet('asdfghjkloiuytresazxcvbnmkl', 25);
            expect(r).toBe(false);

        });
        it ('should be true when there are not more letters than the limit', function() {
            var r = formValidator.fieldMaxLet('abcdf', 25);
            expect(r).toBe(true);
        });
    });

});
