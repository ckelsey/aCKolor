(function(aCKolor) {
	'use strict';

	aCKolor.directive('aCkolorHexInput', function(){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elm, attr, ngModel) {

				function into(data) {
					var chars = data.split('');

					if(chars[0] === '#'){
						chars.shift();
					}

					if(chars.length === 3){
						chars = chars.concat(chars);
					}

					data = '#' + chars.join('');

					return data;
				}

				ngModel.$parsers.push(into);
			}
		};
	});
})(angular.module('aCKolor'));
