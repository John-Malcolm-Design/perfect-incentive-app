angular.module('starter.controllers', [])
 
.controller('IntroCtrl', function($scope, $http) {
    $scope.title = "Log In";
    $scope.result = "not yet";
    $scope.login = function(){
        var self = this;
        console.log("login");
        var user = '';
        var loginData = {
            grant_type: 'password',
            username: 'hi@johnmalcolmdesign.com',
            password: '12345JmA'
        };
        
        $http({
            method: 'POST',
            url: 'https://perfectcard-web-test.cloudapp.net/Token',
            data: loginData
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.result = response;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.result = response;
  });

        // $.ajax({
        //     type: 'POST',
        //     url: 'https://perfectcard-web-test.cloudapp.net/Token',
        //     data: loginData
        // }).done(function (data) {
        //     self.user(data.userName);
        //     // Cache the access token in session storage.
        //     sessionStorage.setItem(tokenKey, data.access_token);
        // }).fail(console.log('failed'));
    }
})
 
.controller('MainCtrl', function($scope) {
 
});