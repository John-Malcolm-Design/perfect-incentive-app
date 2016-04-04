/*
    Services
    Contains user functions for communicating with RESTfull backend.
    Single responsibility principle.   
*/
angular.module('perfect.services', ['ngSanitize'])

    // User Service
    .service('user', function($q, $http, $state, ENDPOINT_URI) {

        // Variable Declaration
        var tokenKey = 'accessToken';
        this.cards = {};

        // Login function
        this.login = function(username, password) {

            // DEBUG - Log endpoint
            console.log(ENDPOINT_URI);

            // Login data
            var loginData = {
                grant_type: 'password',
                username: username,
                password: password
            };

            // HTTP POST Method
            $http({
                method: 'POST',
                url: ENDPOINT_URI + '/Token',
                transformRequest: this.transformRequest,
                data: loginData

                // Callback
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data.access_token) {
                    // console.log(response.data.access_token);
                    // window.localStorage[tokenKey] = response.data.access_token;
                    sessionStorage.setItem(tokenKey, response.data.access_token);
                    if ($state.current.name == "login") {
                        $state.go('intro');
                    } else {
                        $state.go('my-cards');
                    }
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                return response;
            });
        }

        // Test Api function
        this.testApi = function() {

            // HTTP GET Method
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

        // Transform request data into url-encodeded Content-Type
        this.transformRequest = function(obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };

        // Get Token headers for authorization
        this.getTokenHeaders = function() {
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }
            return headers;
        };

        // Get cards for My Cards section
        this.getCardDetail = function() {

            // Promise decleration
            var defer = $q.defer();

            // HTTP POST Method
            $http({
                method: 'GET',
                url: ENDPOINT_URI + '/api/carddetail',
                headers: this.getTokenHeaders(),
                
                // Callback
            }).then(function successCallback(response) {
                defer.resolve(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.  
            });

            // Return promise once complete
            return defer.promise;
        }
        
        // Quick Balance Check 
        this.quickBalanceCheck = function(pan, ccv) {
            
            // POST data
            var cardData = { PAN: pan, CCV: ccv };
            
            // Promise decleration
            var defer = $q.defer();
            
            // HTTP POST method
            $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                url: ENDPOINT_URI + '/api/checkcardbalance',
                data: cardData
                
                // Callback
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
        
        // Logout function
        this.logOut = function() {
            sessionStorage.removeItem(tokenKey);
            $state.go('home');
        }
    });