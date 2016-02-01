'use strict';
angular.module('app', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'aCKolor'
])
.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "/demo.html",
        controller: 'AppCtlr'
    })
    .otherwise({ redirectTo: '/' });
}])
.controller('AppCtlr', function(){
    this.color = "#a10005";
    //this.color2 = "rgb(133,111,1)"
    this.color2 = "hsl(133,50%,50%)";
});
