(function(demo){
	demo.directive('demoCompile', function ($compile) {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {

				function compile(){
					elem.html(scope.$eval(attrs.demoCompile));
					$compile(elem.contents())(scope);
				}

				compile();

				scope.$watch(function(){return scope.$eval(attrs.demoCompile); }, function(newVal, oldVal){
					if(newVal !== oldVal){
						compile();
					}
				});
			}
		};
	});
})(angular.module('app'));
