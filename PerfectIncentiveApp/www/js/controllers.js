angular.module('perfect.controllers', [])

    .controller('LoginCtrl', function($scope, $state, user) {
        $scope.user = {};
        $scope.result = {};
        $scope.login = function() {
            $scope.result = user.login($scope.user.email, $scope.user.password);
        };
    })

    .controller('HomeCtrl', function($scope, $http, user) {
        $scope.baseUrl = 'https://perfectcard-web-test.cloudapp.net';

        $scope.testApi = function() {
            user.testApi();
        };

        $scope.callNonCors = function() {
            user.callNonCors();
        };

        $scope.logOut = function() {
            user.logOut();
        };

    })