'use strict';
angular.module('app', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
	'aCKolor'
])
.config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: "/demo.html",
		controller: 'AppCtlr',
	})
	.otherwise({ redirectTo: '/' });
})

.controller('AppCtlr', function(){
	this.color = "#a10005";
    this.color2 = "rgb(133,111,1)";
	this.color3 = "rgba(133,111,1,.5)";
    this.color4 = "hsl(133,50%,50%)";
	this.color5 = 'transparent';
	this.color6 = 'garbalygook';

	this.id = 'an_id';
	this.inputId = 'input_id';
	this.type = 'hidden';
	this.defaultColor = '#a10005';
	this.blur = true;
	this.name = 'a_name';
	this.width = 250;
});
