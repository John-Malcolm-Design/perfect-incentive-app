angular.module('perfect.controllers', [])

    .controller('LoginCtrl', function($scope, $state, user) {
        $scope.user = {};
        $scope.result = {};
        $scope.login = function() {
            user.login($scope.user.email, $scope.user.password);
        };
    })

    .controller('HomeCtrl', function($scope, $http, user) {
        $scope.baseUrl = 'http://test.perfectpaas.com/';

        $scope.testApi = function() {
            user.testApi();
        };

        $scope.getCardDetail = function() {
            user.getCardDetail();
        };

        $scope.logOut = function() {
            user.logOut();
        };

    })

    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

        // Called to navigate to the main app
        $scope.startApp = function() {
            $state.go('my-cards');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

    })

    .controller('MyCardsCtrl', function($scope, user, $state, $ionicSlideBoxDelegate) {
        $scope.cards;

        $scope.getCards = function() {
            user.getCardDetail().then(function(response) {
                $scope.cards = response.data;
                console.log(response);
            }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });;
        };

        $scope.getCards();
    })