/*
    Contains controllers for the app. 
    Needs to be refactored into seperate files as per angularJS style guide.
*/
angular.module('perfect.controllers', [])

    // Login Controller
    .controller('LoginCtrl', function($scope, $state, user, $ionicSideMenuDelegate) {

        // Variable decleration
        $scope.user = {};
        $scope.result = {};

        // Disable sidemenu for view
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });

        // Login function
        $scope.login = function() {
            user.login($scope.user.email, $scope.user.password);
        };
    })

    // Home Controller
    .controller('HomeCtrl', function($scope, $http, user, $ionicSideMenuDelegate, $ionicPopover) {

        //Variable declerations
        $scope.card = {};
        $scope.balance = {};
        $scope.user = {};
        $scope.result = {};
        $scope.hasCardDetails = false;
        $scope.showingBalance = false;
        $scope.qBC = 'Quick Balance<br/> Check';

        // Disable sidemenu for this view
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });

        // Home login function 
        $scope.login = function() {
            user.login($scope.user.email, $scope.user.password);
        };

        // Quick Balance Check tapped function
        $scope.checkQBC = function($event) {
            if (window.localStorage['hascard'] == 1) {
                console.log('truuu');
                if ($scope.showingBalance == true) {
                    angular.element(document.getElementById('qbc-text')).css({
                        'font-size': '24px',
                        'paddingBottom': '10px'
                    });
                    $scope.qBC = 'Quick Balance<br/> Check';
                    $scope.showingBalance = false;
                } else {
                    $scope.balance = window.localStorage['balance'];
                    angular.element(document.getElementById('qbc-text')).css({
                        'font-size': '44px',
                        'paddingBottom': '0px'
                    });
                    $scope.showingBalance = true;
                    $scope.qBC = '€' + $scope.balance;
                }
            } else {
                $scope.openPopover($event);
            }
        }

        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
        
        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
        
        // Perform quick balance server poll 
        $scope.quickBalanceCheck = function() {
            
            // Hide form
            angular.element(document.getElementById('qbcList')).css({
                'display': 'none'
            });
            
            // Display loading spinner 
            angular.element(document.getElementById('spinny')).css({
                'display': 'block'
            });
            
            // Call Quick Balance check 
            user.quickBalanceCheck($scope.card.pan, $scope.card.ccv).then(function(response) {
                
                // Set local storage variables
                window.localStorage['balance'] = response.data.Balance;
                window.localStorage['hascard'] = 1;
                
                // Close the pop over
                $scope.closePopover();
                
                // Set flags
                $scope.hasCardDetails = true;
                $scope.showingBalance = true;
                
                // Set balance
                $scope.balance = response.data.Balance;
                console.log(response.data.Balance);
                
                // Display Balance
                $scope.qBC = '€' + $scope.balance;
                angular.element(document.getElementById('qbc-text')).css({
                    'font-size': '44px',
                    'paddingBottom': '0px'
                });
            });
        }
        
        // Endpoint testing functions
        $scope.testApi = function() {
            user.testApi();
        };

        $scope.getCardDetail = function() {
            user.getCardDetail();
        };

        // Log out function
        $scope.logOut = function() {
            user.logOut();
        };

    })

    // Intro contoller
    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
        
        // Hide sidemenu
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });

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

    // My Cards controller
    .controller('MyCardsCtrl', function($ionicHistory, $scope, user, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
        
        // Variable declerations
        $scope.cards;
        $scope.selectedCards = [];

        // Enable sidemenu
        $scope.$on('$ionicView.enter', function() {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });
       
        // Get cards function
        $scope.getCards = function() {
            user.getCardDetail().then(function(response) {
                $scope.cards = response.data;
                console.log(response);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });;
            
            // Log out function
            $scope.logOut = function() {
                user.logOut();
            }
        };
        
        // Get cards on page load
        $scope.getCards();
        
        // Select/ Deselect cards
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
        
        // Enable/ disable buttons 
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
    
    // Sign up controller
    .controller('SignUpCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
        
        // Disable sidemenu
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });

    })

    // Forgot password controller
    .controller('ForgotPasswordCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });

    })
    
    // Edit profile controller
    .controller('EditProfileCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });

    })