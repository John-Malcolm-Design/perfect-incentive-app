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
var app = angular.module('perfect', ['ionic', 'perfect.services', 'perfect.controllers',])

// App Constants
app.constant('ENDPOINT_URI', 'https://test.perfectpaas.com');

// App configuration
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    // Default URL is root
    $urlRouterProvider.otherwise('/login')

    // The Perfect PaSS endpoint only accepts x-www-form-urlencoded Content-Type when posting data.
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Route configuration

    // Login 
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })

    // Sign Up 
    $stateProvider.state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up.html',
        controller: 'SignUpCtrl'
    })

    // Forgot Password
    $stateProvider.state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'views/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
    })

    // Intro 
    $stateProvider.state('intro', {
        url: '/intro',
        templateUrl: 'views/intro.html',
        controller: 'IntroCtrl'
    })

    // Home 
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })

    // My Cards 
    $stateProvider.state('my-cards', {
        url: '/my-cards',
        templateUrl: 'views/my-cards.html',
        controller: 'MyCardsCtrl'
    })

    // Edit Profile
    $stateProvider.state('edit-profile', {
        url: '/edit-profile',
        templateUrl: 'views/edit-profile.html',
        controller: 'EditProfileCtrl'
    })


});

// App run function
app.run(function($ionicPlatform, $rootScope, user) {

    $rootScope.logOut = function(path) {
        user.logOut(path);
    };


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

