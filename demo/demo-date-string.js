(function(demo){
	demo.directive('demoDateString', function(){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attr, ngModel) {
				var errorTargetSelector = attr.target;
				var errorClass = attr.errorClass || 'error';

				var validDate = function(d){
					if ( Object.prototype.toString.call(d) === "[object Date]" ) {
						if ( isNaN( d.getTime() ) ) {
							return false;
						}else {
							return true;
						}
					}else {
						return false;
					}
				}

				function out(input) {
					var d = new Date(input);

					var el = null;

					if(errorTargetSelector){
						el = angular.element(document.querySelectorAll(errorTargetSelector));
					}else{
						el = element;
					}

					if(el && el.length){
						if(!validDate(d)){
							el.addClass(errorClass);
						}else{
							el.removeClass(errorClass);
						}
					}

					return d;
				}

				function into(data) {
					return new Date(data);
				}
				ngModel.$parsers.push(out);
				ngModel.$formatters.push(into);

			}
		};
	});
})(angular.module('app'));
