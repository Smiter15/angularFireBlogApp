'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.service('CommonProp', ['$location', function($location) {
    var user = '';
    var email = '';
    var fb = new Firebase("https://fa-slack.firebaseio.com/");

    return {
        setUser: function(value) {
            localStorage.setItem("username", value);
            user = value;
        },
        getUser: function() {
            if (user == '') {
                user = localStorage.getItem('username');
            }
            return user;
        },
        setEmail: function(value) {
            localStorage.setItem("userEmail", value);
            email = value;
        },
        getEmail: function() {
            if (email == '') {
                email = localStorage.getItem('userEmail');
            }
            return email;
        },
        logoutUser: function() {
            fb.unauth();
            console.log('done logout');
            user = '';
            email = '';
            localStorage.removeItem('username');
            localStorage.removeItem('userEmail');
            $location.path('/home');
        }
    };
}])

.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
])

// Home controller
.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', function($scope, $location, CommonProp) {

    var login = {};
    $scope.login = login;

    var fb = new Firebase("https://fa-slack.firebaseio.com/");

    // if session exits, log user in and redirect to welcome page
    fb.onAuth(function(authData) {
        if (authData) {
            CommonProp.setUser(authData.password.email);
            $location.path('/welcome');
        }
    });

    $scope.SignInWithEmailAndPassword = function(e) {
        e.preventDefault();

        login.loading = true;

        var email = $scope.user.email;
        var password = $scope.user.password;

        fb.authWithPassword({
            "email": email,
            "password": password
        }, function(error, authData) {
            if (error) {
                $scope.loginError = true;
                switch (error.code) {
                    case "INVALID_EMAIL":
                        $scope.loginErrorMessage = "That user account email is invalid.";
                        break;
                    case "INVALID_PASSWORD":
                        $scope.loginErrorMessage = "That user account password is incorrect.";
                        break;
                    case "INVALID_USER":
                        $scope.loginErrorMessage = "That user account does not exist.";
                        break;
                    default:
                        $scope.loginErrorMessage = "Error logging user in: " + error;
                }
                login.loading = false;
                $scope.$apply();
            } else {
                fb.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: $scope.getName(authData)
                });
                var betterUsername = $scope.getName(authData)
                CommonProp.setUser(betterUsername);
                CommonProp.setEmail(email);
                login.loading = false;
                $location.path('/welcome');
                $scope.$apply();
            }
        });

    }

    // find a suitable name based on the meta info given by each provider
    $scope.getName = function(authData) {
        switch (authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
            case 'twitter':
                return authData.twitter.displayName;
            case 'facebook':
                return authData.facebook.displayName;
        }
    }

}]);
