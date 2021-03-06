/*global describe, it, formValidator, expect */

// Form
describe ('Formvalidator contains', function() {
    // Not empty
    describe ('Required field', function() {
        it ('should be false when the field is empty', function() {
            var r = formValidator.fieldIsNotEmpty('');
            expect(r).toBe(false);
        });
        it ('should be true when the field is not empty', function() {
            var r = formValidator.fieldIsNotEmpty('field');
            expect(r).toBe(true);
        });
    });

    // Number
    describe ('Numerical field', function() {
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
    describe ('Validation of email', function() {
        it ('should return false when the email is not valid', function() {
            var r = formValidator.fieldIsValidEmail('');
            expect(r).toBe(false);

        });
        it ('should return true when the email is valid', function() {
            var r = formValidator.fieldIsValidEmail('email@email.com');
            expect(r).toBe(true);
        });
    });

    // Minimum number of letters
    describe ('Validation of fields with minimum number of letters limit', function() {
        it ('should be false when there are not enough letters', function() {
            var r = formValidator.fieldHasMinLen('a', 2);
            expect(r).toBe(false);
        });
        it ('should be true when there are enough letters', function() {
            var r = formValidator.fieldHasMinLen('abc', 2);
            expect(r).toBe(true);
        });
        it ('should be true when there are enough numbers', function() {
            var r = formValidator.fieldHasMinLen(12345678, 8);
            expect(r).toBe(true);
        });
    });

    // Maximum number of letters
    describe ('Validation of fields with maximum number of letters limit', function() {
        it ('should be false when there are too much letters', function() {
            var r = formValidator.fieldHasMaxLen('asdfghjkloiuytresazxcvbnmkl', 25);
            expect(r).toBe(false);
        });
        it ('should be true when there are not more letters than the limit', function() {
            var r = formValidator.fieldHasMaxLen('abcdf', 25);
            expect(r).toBe(true);
        });
        it ('should be true when there are not more numbers than the limit', function() {
            var r = formValidator.fieldHasMaxLen(123456, 25);
            expect(r).toBe(true);
        });
    });

    //Show errors
    describe ('Show error', function() {
        describe ('Error messages for fields that are required', function() {
            it ('should be empty when the field is not empty and required', function() {
                var r = formValidator.showError('name', 'value', 'fieldIsNotEmpty');
                expect(r).toBe('');
            });
            it ('should be field is empty when the field is empty and required', function() {
                var r = formValidator.showError('name', '', 'fieldIsNotEmpty');
                expect(r).toBe('Name is empty.');
            });
        });
        describe ('Error messages for fields that must have numeric values', function() {
            it ('should be empty when the field is a number and it is required to be a number', function() {
                var r = formValidator.showError('name', '6757647', 'fieldIsNumber');
                expect(r).toBe('');
            });
            it ('should be field is not a number when the field must be a number', function() {
                var r = formValidator.showError('phone', 'NaN value', 'fieldIsNumber');
                expect(r).toBe('Phone is not a number.');
            });
        });
        describe ('Error messages for fields that must be valid emails', function() {
            //fieldIsValidEmail
            it ('should be empty when the field is a valid email', function() {
                var r = formValidator.showError('name', 'test@live.com', 'fieldIsValidEmail');
                expect(r).toBe('');
            });
            it ('should be field is not a valid email when the email is not valid', function() {
                var r = formValidator.showError('email', 'not an email', 'fieldIsValidEmail');
                expect(r).toBe('Email is not a valid.');
            });
        });
        describe ('Error messages for fields that must have minimum length', function() {
            //fieldIsValidEmail
            it ('should be empty when the field is big enough', function() {
                var r = formValidator.showError('name', 'field', 'fieldHasMinLen', 3);
                expect(r).toBe('');
            });
            it ('should be field is not big enough when it is too small', function() {
                var r = formValidator.showError('name', 'fi', 'fieldHasMinLen', '3');
                expect(r).toBe('Name is too small.');
            });
        });
        describe ('Error messages for fields that must have maximum length', function() {
            //fieldIsValidEmail
            it ('should be empty when the field is smaller that the limit', function() {
                var r = formValidator.showError('name', 'field', 'fieldHasMaxLen', 6);
                expect(r).toBe('');
            });
            it ('should be field is too big when it is biger than the limit', function() {
                var r = formValidator.showError('name', 'field', 'fieldHasMaxLen', 4);
                expect(r).toBe('Name is too big.');
            });
        });

    });
});