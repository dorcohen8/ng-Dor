var mainModule = angular.module("mainModule");

mainModule.factory('configService',["$http", function ($http) {
    var server = "";
    var port = "8080";
    var getConfigurationMethod = "/Api/getConfiguration/";

    var urlParams = [];
    urlParams.push(
      "http://",
      server,
      ":",
      port
    );
    var url = urlParams.join("");

    function getConfiguration() {
        var config = [];
        var promise = $http.get(url + getConfigurationMethod).
          then(function (response) {
              // this callback will be called asynchronously on success
              config = response.data;
              return config;
          });
        return promise;
    }

    // expose a public API
    return {
        getConfiguration: getConfiguration
    };
}]);