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
            expect(r).toBe(true);
        });
    });

    // Email signs
    describe ('Valid email', function () {
        it ('should be false when the email is not valid', function() {
            var r = formValidator.fieldValidEmail('');
            expect(r).toBe(false);
            
        });
        it ('should be true when the email is valid', function() {
            var r = formValidator.fieldValidEmail('email@email.com');
            expect(r).toBe(true);
        });
    });


    // Minimum number of letters
    describe ('Minimum number of letters', function () {
        it ('should be false when there are not enough letters', function() {
            var r = formValidator.fieldMinLet('a');
            expect(r).toBe(false);
            
        });
        it ('should be true when there are enough letters', function() {
            var r = formValidator.fieldMinLet('abc');
            expect(r).toBe(true);
        });
    });

});
