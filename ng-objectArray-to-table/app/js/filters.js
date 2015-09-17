var app = angular.module('mainModule');

app.filter('daysFilter', function () {
    return function (input) {
        return input == '1' ? 'Today' : 'Last ' + input + ' days';
    };
});

app.filter('capitalCaseToSpace', function () {
    return function (input) {
        return input.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
});