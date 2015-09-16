var app = angular.module('myapp', []);

app.controller('mainCtrl', function ($scope, $http, $interval) {
    $scope.list = [];
    $scope.queryString = "";    
    $scope.menuItem = "List";
    var sortingField = '';
    
    function sorting(item1, item2) {
        if (item1[sortingField] < item2[sortingField])
            return -1;
        if (item1[sortingField] > item2[sortingField])
            return 1;
        return 0;
    }

    $scope.sort = function (array, field) {
        if (sortingField === field) {
            array = array.reverse();
        }
        else {
            sortingField = field;
            array = array.sort(sorting);
        }
    };

    $scope.filterFunction = function (element) {
        console.log("filterFunction");
        return element.name.match(/^Ma/) ? true : false;
    };

    // Checking if $scope.$apply is needed before performing it
    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});