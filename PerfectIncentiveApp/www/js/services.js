angular.module('perfect.services', [])

    .service('user', function($http, $state, ENDPOINT_URI) {
        var tokenKey = 'accessToken';

        this.login = function(username, password) {
            console.log(ENDPOINT_URI);
            var loginData = {
                grant_type: 'password',
                username: 'hi@johnmalcolmdesign.com',
                password: '12345JmA'
                // username: username,
                // password: password
            };
            $http({
                method: 'POST',
                url: ENDPOINT_URI + '/Token',
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: loginData
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data.access_token) {
                    console.log(response.data.access_token);
                    sessionStorage.setItem(tokenKey, response.data.access_token);
                    $state.go('home');
                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.result = response;
            });
        }
    });