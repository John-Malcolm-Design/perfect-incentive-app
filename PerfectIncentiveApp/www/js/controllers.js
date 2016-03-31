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
        $scope.selectedCards = [];

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

        $scope.toggleCard = function(id) {
            if ($scope.selectedCards.indexOf(id) == -1) {
                console.log('pushing');
                $scope.selectedCards.push(id);
                console.log($scope.selectedCards);

                console.log(id);
                console.log(document.getElementById('card' + id));
                angular.element(document.getElementById('card' + id)).addClass('creditcard-selected');

                var buttons = $scope.getButtons();

                for (var btn of buttons) {
                    angular.element(btn).addClass('button-positive');
                }
            } else {
                console.log('remove');
                var index = $scope.selectedCards.indexOf(id);
                if (index > -1) {
                    $scope.selectedCards.splice(index, 1);
                }
                console.log($scope.selectedCards);
                console.log(document.getElementById('card' + id));
                angular.element(document.getElementById('card' + id)).removeClass('creditcard-selected')

                var buttons = $scope.getButtons();

                for (var btn of buttons) {
                    angular.element(btn).addClass('button-positive');
                }
            }


        };

        $scope.getButtons = function() {
            var buttons = [];
            buttons.push(document.getElementById('suspend'));
            buttons.push(document.getElementById('activate'));
            buttons.push(document.getElementById('replace'));
            return buttons;
        }
        
        /*
        create flag to see if anything is in selected cards array
        flag can be bound to buttons style.
        */


    })