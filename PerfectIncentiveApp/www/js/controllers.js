angular.module('starter.controllers', [])
 
.controller('IntroCtrl', function($scope, $http, $state) {
    $scope.title = "Log In";
    $scope.user = {};
    $scope.login = function(){
        var self = this;
        console.log("login");
        var user = '';
        var loginData = {
            grant_type: 'password',
            username: 'hi@johnmalcolmdesign.com',
            password: '12345JmA'
        };
        delete $http.defaults.headers.common['X-Requested-With'];
        $http({
            method: 'POST',
            url: 'https://perfectcard-web-test.cloudapp.net/Token',
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: loginData

            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('success');
                sessionStorage.setItem('accessToken', response.data.access_token);
                console.log(sessionStorage.accessToken);
                $state.go('main');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.result = response;
            });    
    }
})
 
.controller('MainCtrl', function($scope) {
 
});