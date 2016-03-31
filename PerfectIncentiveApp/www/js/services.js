angular.module('perfect.services', [])

    .service('user', function($q, $http, $state, ENDPOINT_URI) {

        var tokenKey = 'accessToken';
        this.cards = {};

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
                transformRequest: this.transformRequest,
                data: loginData
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data.access_token) {
                    // console.log(response.data.access_token);
                    // window.localStorage[tokenKey] = response.data.access_token;
                    sessionStorage.setItem(tokenKey, response.data.access_token);
                    $state.go('intro');
                }


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                return response;
            });
        }

        this.testApi = function() {
            $http({
                method: 'GET',
                url: ENDPOINT_URI + '/api/GiftCardOnAccount',
                transformRequest: this.transformRequest,
                headers: this.getTokenHeaders()
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };

        this.transformRequest = function(obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };

        this.getTokenHeaders = function() {
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            return headers;
        };

        this.getCardDetail = function() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: ENDPOINT_URI + '/api/carddetail',
                transformRequest: this.transformRequest,
                headers: this.getTokenHeaders(),
            }).then(function successCallback(response) {
                defer.resolve(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.  
            });

            return defer.promise;
        }

        this.logOut = function() {
            sessionStorage.removeItem(tokenKey);
            $state.go('login');
        }

    });