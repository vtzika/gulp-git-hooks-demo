// Form
describe ('Formvalidator contains', function() {
    // Not empty
    describe ('Required field', function() {
        it ('should be false when the field is empty', function() {
            var r = formValidator.fieldNotEmpty('');
            expect(r).toBe(false);
        });
        it ('should be true when the field is not empty', function() {
            var r = formValidator.fieldNotEmpty('field');
            expect(r).toBe(true);
        })
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
        })
    })

});
