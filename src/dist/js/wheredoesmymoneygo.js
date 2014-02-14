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
var data = {
    'Zdravstveno varstvo': 104849156.00,
    'Podjetništvo in konkurenčnost': 311820684.00,
    'Kultura': 201398119.00,
    'Izobraževanje in šport': 1441488039.00,
    'Institucije političnega sistema in civilne družbe': 88732501.00,
    'Institucije pravne drŽave, svobode in varnosti': 275866175.00,
    'Upravljanje sistemov javne uprave': 512932734.00,
    'Visoko šolstvo, znanost, tehnologija in informacijska druŽba': 709184932.00,
    'Energetika': 70795363.00,
    'Trg dela': 373341291.00,
    'Kmetijstvo, gozdarstvo, ribištvo in prehrana': 457869797.00,
    'Promet in prometna infrastruktura': 708520360.00,
    'Servisiranje javnega dolga, plačila v evropsko unijo in rezerve': 251691657.00,
    'Nacionalna varnost, obramba in zunanje zadeve': 928753962.00,
    'Socialna varnost': 2451905070.00,
    'Okoljska in prostorska politika': 355595154.00
};

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.grossWage = null;
    $scope.taxBase = null;
    $scope.netWage = null;
    $scope.taxAmount = null;
    $scope.pizAmount = null;
    $scope.zzAmount = null;
    $scope.svAmount = null;
    $scope.jobSecurityAmount = null;
    $scope.taxCategoriesAmounts = {};
    $scope.taxCategoriesPopovers = {};

    $scope.isInitialPageShown = true;
    $scope.isTaxPageCategoriesPageShown = false;

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
        if (yearlyWage <= 10866.37) {
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

    $scope.calculateTaxCategories = function (taxAmount) {
        var result = {};
        var total = 0;
        var category = null;
        for (category in data) {
            if (data.hasOwnProperty(category)) {
                total += data[category];
            }
        }

        for (category in data) {
            if (data.hasOwnProperty(category)) {
                console.log(total/data[category]);
                result[category] = taxAmount * (data[category] / total);
            }
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

            $scope.taxCategoriesAmounts = $scope.calculateTaxCategories($scope.taxAmount);
        }
    };

    $scope.showInitialPage = function () {
        $scope.isInitialPageShown = true;
        $scope.isTaxPageCategoriesPageShown = false;
    };

    $scope.showTaxPageCategorized = function () {
        $scope.isInitialPageShown = false;
        $scope.isTaxPageCategoriesPageShown = true;
    };
}]);
