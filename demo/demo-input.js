(function(demo){
	demo.directive('demoInput', function($compile) {
		return {
			restrict: 'E',
			link: function(scope, element, attr) {

				scope.debug = function(thing){
					console.log(debug);
				};

				function compile(){
					var html = '';
					var changeHtml = '';

					if(scope.option.hasOwnProperty('change')){
						changeHtml = ' ng-change="option.change(directive)"';
					}

					if(scope.option.hasOwnProperty('options')){
						html = '<select ng-model="option.optionModel" ng-options="k as o.name for (k,o) in option.options"'+ changeHtml +'></select>';
					}else{
						switch (scope.option.type) {
							case 'boolean':
							html = '<input type="checkbox" ng-model="option.value"'+ changeHtml +' />';
							break;

							case 'string':
							html = '<input type="text" ng-model="option.value"'+ changeHtml +' />';
							break;

							case 'date':
							html = '<input type="text" ng-model="option.value"'+ changeHtml +' />';
							break;

							case 'number':
							html = '<input type="number" ng-model="option.value" '+ changeHtml +' />';
							break;

							case 'object':
							case 'array':
							html = '<textarea demo-json-text ng-model="option.value"'+ changeHtml +'></textarea>';
							break;
						}
					}

					element.html(html);
					$compile(element.contents())(scope);
				}

				scope.$watch(function(){return scope.option.type;}, function(){
					compile();
				});
			}
		};
	});
})(angular.module('app'));
