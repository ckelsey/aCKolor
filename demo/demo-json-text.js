(function(demo){
	demo.directive('demoJsonText', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attr, ngModel) {
				function into(input) {
					try {
						return JSON.parse(input);
					} catch (e) {
						return input.toString();
					}
				}

				function out(data) {
					try {
						return JSON.stringify(data, null, '\t');
					} catch (e) {
						return data;
					}
				}
				ngModel.$parsers.push(into);
				ngModel.$formatters.push(out);

			}
		};
	});
})(angular.module('app'));
