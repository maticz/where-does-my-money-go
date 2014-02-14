'use strict';
// Source: js/app.js
/*global angular*/

var app = angular.module('wheredoesmymoneygo', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when("/", {
            controller: "MainCtrl",
            templateUrl: "/templates/main.html",
            reloadOnSearch: false
        }).
        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
    }]
);

// Source: js/controllers/main.js
/*global angular,app*/
app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.grossWage = null;
}]);
