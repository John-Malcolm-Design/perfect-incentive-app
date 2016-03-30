/* 
Perfect Incentive App
    Global 'app' module declaration. 
    Contains global configuration and route configuration.
    'Perfect' is the ng-app namespace as much of the code in this MVP will be 
    used not only on the 'Perfect Incentive' app but also other products
    including 'Perfect Centre' and 'Perfect Expense'.
    
    MAIN PROJECT FILES:
    App Template -  ./www/index.html 
    Global styles - ./www/scss/ionic.app.scss
    Controllers -   ./www/js/controllers.js
    
    Design References:
    - Perfect Incentive Rebrand Board: 
    - Websapp - Prototype
    - Mobile App Prototype:
*/

// Declare global app module and inject dependencies. 
var app = angular.module('perfect', ['ionic', 'perfect.controllers'])

// App configuration
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    // Default URL is root
    $urlRouterProvider.otherwise('/')
    
    // The Perfect PaSS endpoint only accepts x-www-form-urlencoded Content-Type when posting data.
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // /**
    //  * Converts an object to x-www-form-urlencoded serialization.
    //  * @param {Object} obj
    //  * @return {String}
    //  */ 
    // var param = function(obj) {
    //     // Query string builder
    //     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        
    //     // Loop through object
    //     for(name in obj) {
    //     value = obj[name];
            
    //     // If contains array - parse array
    //     if(value instanceof Array) {
    //         for(i=0; i<value.length; ++i) {
    //         subValue = value[i];
    //         fullSubName = name + '[' + i + ']';
    //         innerObj = {};
    //         innerObj[fullSubName] = subValue;
    //         query += param(innerObj) + '&';
    //         }
    //     }
    //     // else if contains sub obj - parse object
    //     else if(value instanceof Object) {
    //         for(subName in value) {
    //         subValue = value[subName];
    //         fullSubName = name + '[' + subName + ']';
    //         innerObj = {};
    //         innerObj[fullSubName] = subValue;
    //         query += param(innerObj) + '&';
    //         }
    //     }
    //     // else if string - concat
    //     else if(value !== undefined && value !== null)
    //         query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    //     }
    //     // Once finished looping over object return the query string
    //     return query.length ? query.substr(0, query.length - 1) : query;
    // };

    // // Override $http service's default transformRequest
    // $httpProvider.defaults.transformRequest = [function(data) {
    //     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    // }];
    
    // Route configuration
    
    // Introduction page
    $stateProvider.state('intro', {
        url: '/',
        templateUrl: 'views/intro.html',
        controller: 'IntroCtrl'
    })
    
    // Main page
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    
    // Test page
    $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
    })
    
});

// App run function
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

