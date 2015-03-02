/* global describe, it */



	describe ('Formvalidator contains', function () {
		describe ('Field is not empty', function () {
			it ('should be false when the field is empty', function() {
				var r = formValidator.fieldNotEmpty('');
				expect(r).toBe(false);
			});
			it ('should be true when the field is not empty', function() {
				var r = formValidator.fieldNotEmpty('field');
				expect(r).toBe(true);
			})
		})
	})




