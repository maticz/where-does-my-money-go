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
