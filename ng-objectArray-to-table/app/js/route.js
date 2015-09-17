var mainModule = angular.module("mainModule");

mainModule.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/list', {
            templateUrl: '/app/views/list.html',
            controller: 'mainCtrl'
        }).
        otherwise({
            redirectTo: '/list'
        });
  }]);