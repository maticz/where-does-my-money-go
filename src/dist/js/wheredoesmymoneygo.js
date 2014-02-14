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
    $scope.taxBase = null;
    $scope.netWage = null;
    $scope.taxAmount = null;
    $scope.pizAmount = null;
    $scope.zzAmount = null;
    $scope.svAmount = null;
    $scope.jobSecurityAmount = null;

    $scope.calculatePIZ = function (grossWage) {
        return grossWage * 0.155;
    };

    $scope.calculateZZ = function (grossWage) {
        return grossWage * 0.0636;
    };

    $scope.calculateSV = function (grossWage) {
        return grossWage * 0.001;
    };

    $scope.calculateJobSecurity = function (grossWage) {
        return grossWage * 0.0014;
    };

    $scope.calculateTaxRelief = function (yearlyWage) {
        var result = null;
        if (yearlyWage >= 10866.37) {
            result = 6519.82;
        } else if (yearlyWage > 10866.37 && yearlyWage <= 12570.89) {
            result = 4481.64;
        } else if (yearlyWage > 12570.89) {
            result = 3302.70;
        }

        return result;
    };

    $scope.calculateTaxBase = function (grossWage) {
        var yearlyWage = grossWage * 12;
        return yearlyWage - $scope.calculatePIZ(yearlyWage) - $scope.calculateZZ(yearlyWage) - $scope.calculateSV(yearlyWage) - $scope.calculateJobSecurity(yearlyWage) - $scope.calculateTaxRelief(yearlyWage);
    };

    $scope.calculateYearlyTax = function (taxBase) {
        var result = null;
        if (taxBase <= 8021.34) {
            result = taxBase * 0.16;
        } else if (taxBase > 8021.34 && taxBase <= 18960.28) {
            result = 1283.41 + (taxBase - 8021.34) * 0.27;
        } else if (taxBase > 18960.28 && taxBase <= 70907.20) {
            result = 4236.92 + (taxBase - 18960.28) * 0.41;
        } else if (taxBase > 70907.20) {
            result = 25535.16 + (taxBase - 70907.20) * 0.5;
        }

        return result;
    };

    $scope.calculateAmounts = function () {
        if ($scope.grossWage) {
            var taxBase = $scope.calculateTaxBase($scope.grossWage);
            $scope.taxAmount = $scope.calculateYearlyTax(taxBase) / 12;
            $scope.pizAmount = $scope.calculatePIZ($scope.grossWage);
            $scope.zzAmount = $scope.calculateZZ($scope.grossWage);
            $scope.svAmount = $scope.calculateSV($scope.grossWage);
            $scope.jobSecurityAmount = $scope.calculateJobSecurity($scope.grossWage);
            $scope.netWage = $scope.grossWage - $scope.taxAmount - $scope.pizAmount - $scope.zzAmount - $scope.svAmount - $scope.jobSecurityAmount;
        }
    };

    $scope.showTaxPageCategorized = function () {
        return;
    };
}]);
