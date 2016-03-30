angular.module('perfect.controllers', [])
 
.controller('IntroCtrl', function($scope, $http, $state) {
    $scope.title = "Log In";
    $scope.user = {};
    $scope.result = {};
    $scope.tokenKey = 'accessToken';
    $scope.baseUrl = 'https://perfectcard-web-test.cloudapp.net';
    
    $scope.login = function(){
        console.log("login");
        var loginData = {
            grant_type: 'password',
            // username: $scope.user.email,
            // password: $scope.user.password
            username: 'hi@johnmalcolmdesign.com',
            password: '12345JmA'
        };
        delete $http.defaults.headers.common['X-Requested-With'];
        $http({
            method: 'POST',
            url: $scope.baseUrl + '/Token',
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
                sessionStorage.setItem($scope.tokenKey, response.data.access_token);
                $state.go('main');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.result = response;
            });    
    }
})
 
.controller('MainCtrl', function($scope, $http) {
    $scope.baseUrl = 'https://perfectcard-web-test.cloudapp.net';
    $scope.tokenKey = 'accessToken';

    //  $scope.GetTokenHeaders = function () {
    //     var token = sessionStorage.getItem($scope.tokenKey);
    //     var headers = {};
    //     if (token) {
    //         headers.Authorization = 'Bearer ' + token;
    //     }
    //     return headers;
    // };
    
    $scope.callApi = function () {
          
        // var token = sessionStorage.getItem($scope.tokenKey);
        // delete $http.defaults.headers.common['X-Requested-With'];
        // $http({
        //     method: 'GET',
        //     url: $scope.baseUrl + '/api/GiftCardOnAccount',
        //     transformRequest: function(obj) {
        //         var str = [];
        //         for(var p in obj)
        //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //         return str.join("&");
        //     },
        //     headers: {
        //         'Authorization': 'Bearer ' + token,
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //     }
        // }).then(function successCallback(response) {
        //     // this callback will be called asynchronously
        //     // when the response is available
        // }, function errorCallback(response) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        // });
        
        // JQUERY VERSION
        var token = sessionStorage.getItem($scope.tokenKey);
        console.log(token);
        $.ajax({
            type: 'GET',
            url: $scope.baseUrl + '/api/GiftCardOnAccount',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).done(function (data) {
            self.result(data);
        }).fail(console.log('error'));
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