angular.module('perfect.controllers', [])
 
.controller('LoginCtrl', function($scope, $state, user) {
    $scope.user = {};    
    $scope.login = function(){
        user.login($scope.user.email, $scope.user.password);
    };
})
 
.controller('HomeCtrl', function($scope, $http) {
        $scope.baseUrl = 'https://perfectcard-web-test.cloudapp.net';
 
    $scope.callApi = function () {
               
        var token = sessionStorage.getItem($scope.tokenKey);
        delete $http.defaults.headers.common['X-Requested-With'];
        $http({
            method: 'GET',
            url: $scope.baseUrl + '/api/GiftCardOnAccount',
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        
    };
    

   
})

.controller('TestCtrl', function($scope, $http) {
    $scope.baseUrl = 'https://perfectcard-web-test.cloudapp.net';

    $scope.register = function () {
      
        var data = {
            Email: 'shmal13@gmail.com',
            Password: '12345JmA',
            ConfirmPassword: '12345JmA'
        };
       
        delete $http.defaults.headers.common['X-Requested-With'];
        
        $http({
        method: 'POST',
        url: $scope.baseUrl + '/api/Account/Register',
        headers: {
                'Content-Type': 'application/json; charset=utf-8'
        }, 
        data: JSON.stringify(data)
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('success');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error');
        });        
    }
    
})