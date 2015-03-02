var formValidator = (function () {

	var fieldNotEmpty = function (field) {
		if(field==='') {
			return false;
		} 
		return true;
	} 

	return { fieldNotEmpty : fieldNotEmpty }

}());