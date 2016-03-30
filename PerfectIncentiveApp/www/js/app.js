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
var app = angular.module('perfect', ['ionic', 'perfect.services', 'perfect.controllers'])

// App Constants
app.constant('ENDPOINT_URI', 'https://perfectcard-web-test.cloudapp.net');

// App configuration
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    // Default URL is root
    $urlRouterProvider.otherwise('/login')

    // The Perfect PaSS endpoint only accepts x-www-form-urlencoded Content-Type when posting data.
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Route configuration

    // Login page (Inital app login screen)
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })

    // Home page (Login/ Quick Balance Check)
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
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
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

